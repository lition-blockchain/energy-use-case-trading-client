/* import Web3 from 'web3'; */
import web3Service, { LEDGERS, META_MASK_NETWORKS, NETWORK_ERROR, TIMEOUT_ERROR } from '../web3';
import { formatDateTime } from '../formatter';
import ropstenContract from '../web3/contracts/ropsten';
import liveContract from '../web3/contracts/live';
import moment from 'moment';

const ropstenAddresses = ['0xa705D64d383349F5c198afed7C3292d24EaBa48d'];
const liveAddresses = ['0x3f3c80ceA2d44419fBDA23Be3575fd403c5b4481'];

describe('Web3 Service', () => {
    beforeEach(() => {
        web3Service.web3 = {
            utils: {
                isAddress: jest.fn()
            },
            eth: {
                Contract: jest.fn(),
                net: { getId: jest.fn() },
                getAccounts: jest.fn()
            }
        };
    });

    it('should create web3 instance with metamask provider by default', () => {
        // expect(Web3).toHaveBeenCalledTimes(1);
        // const [[provider]] = Web3.mock.calls;
        // eslint-disable-next-line
        // expect(provider).toBe(web3.currentProvider);
        expect(web3Service.hasMetaMaskProvider()).toBe(true);
    });

    it(
        'should provide method for getting network identifier',
        async () => {
            web3Service.web3.eth.net.getId
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.ropsten))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.main))
                .mockReturnValueOnce(Promise.resolve(78))
                .mockReturnValueOnce(Promise.reject('Error'))
                .mockReturnValueOnce(new Promise(() => {}));

            const ropstenResponse = await web3Service.getNetworkId();
            expect(ropstenResponse.data.id).toEqual(META_MASK_NETWORKS.ropsten);

            const liveResponse = await web3Service.getNetworkId();
            expect(liveResponse.data.id).toEqual(META_MASK_NETWORKS.main);

            await expect(web3Service.getNetworkId()).resolves.toEqual({ data: { id: 78 } });
            await expect(web3Service.getNetworkId()).rejects.toEqual({ response: { data: 'Error' } });
            await expect(web3Service.getNetworkId()).rejects.toEqual(TIMEOUT_ERROR);
        },
        10000
    );

    it(
        'should provide method for getting contract',
        async () => {
            web3Service.web3.utils.isAddress = address => {
                const [expectedAddress] = ropstenAddresses;
                expect(address).toEqual(expectedAddress);
                return true;
            };

            await expect(web3Service.getContract(LEDGERS.ropsten)).resolves.toEqual({ data: {} });

            web3Service.web3.utils.isAddress = address => {
                const [expectedAddress] = liveAddresses;
                expect(address).toEqual(expectedAddress);
                return true;
            };
            await expect(web3Service.getContract(LEDGERS.main)).resolves.toEqual({ data: {} });

            await expect(web3Service.getContract('anotherNetwork')).rejects.toEqual(NETWORK_ERROR);

            const expectedError = new Error('Error');
            web3Service.web3.utils.isAddress = () => {
                throw expectedError;
            };
            await expect(web3Service.getContract(LEDGERS.ropsten)).rejects.toEqual(expectedError);

            web3Service.web3.utils.isAddress = () => false;
            await expect(web3Service.getContract(LEDGERS.ropsten)).rejects.toBeTruthy();
        },
        10000
    );

    it(
        'should provide method for getting current bids',
        async () => {
            const valueDummy = { test: 'test' };
            const contractMockup = {
                data: {
                    getPastEvents: (type, options) => {
                        expect(type).toEqual('BidMade');
                        expect(options).toEqual({ fromBlock: 0, toBlock: 'pending' });
                        return Promise.resolve([{ returnValues: valueDummy }]);
                    }
                }
            };

            web3Service.web3.utils.isAddress.mockReturnValue(true);
            web3Service.web3.eth.Contract.mockImplementation(() => contractMockup.data);

            await expect(web3Service.getCurrentBids(LEDGERS.ropsten)).resolves.toEqual({ data: [{ ...valueDummy }] });

            web3Service.web3.eth.Contract.mockClear();
            web3Service.web3.eth.Contract.mockImplementation(() => {
                throw new Error('error');
            });

            await expect(web3Service.getCurrentBids(LEDGERS.ropsten)).rejects.toEqual({
                response: { data: new Error('error') }
            });
            await expect(web3Service.getCurrentBids(LEDGERS.ropsten)).rejects.toBeTruthy();

            web3Service.web3.eth.Contract.mockClear();
            web3Service.web3.eth.Contract.mockImplementation(() => ({}));
            contractMockup.data.getPastEvents = () => Promise.resolve(undefined);
            await expect(web3Service.getCurrentBids(LEDGERS.ropsten, contractMockup)).resolves.toEqual({ data: [] });
        },
        10000
    );

    it('should provide method for performing transactions', async () => {
        const valueDummy = { test: 'test' };
        const defaultGasPrice = 20000000000;
        const ledgerAddressDummy = 'ledgerAddressTest';
        const contractAddressDummy = 'contractAddressTest';
        const transactionHashDummy = 'transactionHashTest';
        const tradePositionDummy = {
            producerId: 123,
            producerAddress: '0x1',
            energyAvailable: '2',
            energyAvailableFloat: 2.0,
            energyOffered: '--',
            offerAddress: '0x1',
            offerIssued: formatDateTime(1526398769827),
            offerIssuedTimestamp: 1526398769827,
            price: '0,25',
            priceFloat: 0.25,
            producerName: 'test name',
            producerUrl: '/buy_energy/producer/123',
            validOn: '--'
        };
        const todayDate = moment.utc().startOf('day');
        const tomorrowDate = todayDate.add(1, 'days').unix();
        const sendMethodStub = jest
            .fn()
            .mockReturnValueOnce(
                Promise.resolve({
                    transactionHash: transactionHashDummy
                })
            )
            .mockReturnValueOnce(
                Promise.resolve({
                    transactionHash: transactionHashDummy
                })
            )
            .mockReturnValueOnce(Promise.reject('error'));
        const contractMockup = {
            methods: {
                'buy_energy(address,uint32,uint32,uint64)': jest.fn().mockReturnValue({ send: sendMethodStub })
            },
            data: {
                contract: 'contractTest',
                getPastEvents: (type, options) => {
                    expect(type).toEqual('BidMade');
                    expect(options).toEqual({ fromBlock: 0, toBlock: 'pending' });
                    return Promise.resolve([{ returnValues: valueDummy }]);
                }
            }
        };
        web3Service.web3.utils.isAddress = () => true;

        web3Service.web3.eth.Contract.mockClear();
        web3Service.web3.eth.Contract.mockImplementation(() => contractMockup);

        await expect(
            web3Service.performTransaction(
                tradePositionDummy,
                contractAddressDummy,
                LEDGERS.ropsten,
                ledgerAddressDummy
            )
        ).resolves.toEqual({
            data: {
                txHash: transactionHashDummy,
                txTimestamp: tomorrowDate
            }
        });
        expect(web3Service.web3.eth.Contract).toHaveBeenCalledWith(ropstenContract.abi, contractAddressDummy);
        expect(contractMockup.methods['buy_energy(address,uint32,uint32,uint64)']).toHaveBeenCalledWith(
            tradePositionDummy.producerAddress,
            tomorrowDate,
            250,
            2000000
        );
        expect(sendMethodStub).toHaveBeenCalledWith({
            from: ledgerAddressDummy,
            gas: 200000,
            gasPrice: defaultGasPrice
        });
        await expect(
            web3Service.performTransaction(tradePositionDummy, contractAddressDummy, LEDGERS.main, ledgerAddressDummy)
        ).resolves.toEqual({
            data: {
                txHash: transactionHashDummy,
                txTimestamp: tomorrowDate
            }
        });
        expect(web3Service.web3.eth.Contract).toHaveBeenCalledWith(liveContract.abi, contractAddressDummy);
        await expect(
            web3Service.performTransaction(tradePositionDummy, contractAddressDummy, 'live', ledgerAddressDummy)
        ).rejects.toEqual({
            response: {
                data: new Error('Network with no Nordic Energy´s smart contracts')
            }
        });
        await expect(
            web3Service.performTransaction(
                tradePositionDummy,
                contractAddressDummy,
                LEDGERS.ropsten,
                ledgerAddressDummy
            )
        ).rejects.toEqual({
            response: {
                data: 'error'
            }
        });
    });

    it('should provide method for buying energy', async () => {
        const transactionResponseDummy = {
            transactionHash: 'transactionHashTest'
        };
        const defaultGasPrice = 20000000000;
        const sendMethodStub = jest.fn().mockReturnValue(Promise.resolve(transactionResponseDummy));
        const ledgerAddressDummy = 'ledgerAddressTest';
        const producerAddressDummy = 'producerAddressTests';
        const contractDummy = {
            methods: {
                'buy_energy(address,uint32,uint32,uint64)': jest
                    .fn()
                    .mockReturnValueOnce({ send: sendMethodStub })
                    .mockReturnValueOnce({ send: sendMethodStub })
            }
        };
        await expect(
            web3Service.buyEnergy(contractDummy, ledgerAddressDummy, producerAddressDummy, 1526398769827, 250, 2000000)
        ).resolves.toEqual(transactionResponseDummy);
        expect(contractDummy.methods['buy_energy(address,uint32,uint32,uint64)']).toHaveBeenCalledWith(
            producerAddressDummy,
            1526398769827,
            250,
            2000000
        );
        expect(sendMethodStub).toHaveBeenCalledWith({
            from: ledgerAddressDummy,
            gas: 200000,
            gasPrice: defaultGasPrice
        });

        const gasPrice = 10;

        await expect(
            web3Service.buyEnergy(
                contractDummy,
                ledgerAddressDummy,
                producerAddressDummy,
                1526398769827,
                250,
                2000000,
                gasPrice
            )
        ).resolves.toEqual(transactionResponseDummy);
        expect(sendMethodStub).toHaveBeenCalledWith({
            from: ledgerAddressDummy,
            gas: 200000,
            gasPrice: gasPrice
        });
    });

    it(
        'should provide possibility for getting user addresses',
        async () => {
            const addressesDummy = ['addressTest1', 'addressTest2'];
            web3Service.web3.eth.getAccounts.mockReturnValueOnce(Promise.resolve(addressesDummy));
            await expect(web3Service.getUserAddresses()).resolves.toEqual({
                data: {
                    addresses: addressesDummy
                }
            });

            web3Service.web3.eth.getAccounts.mockReturnValueOnce(Promise.reject('error'));
            await expect(web3Service.getUserAddresses()).rejects.toEqual({
                response: {
                    data: 'error'
                }
            });

            web3Service.web3.eth.getAccounts.mockReturnValueOnce(new Promise(() => {}));
            await expect(web3Service.getUserAddresses()).rejects.toEqual(TIMEOUT_ERROR);
        },
        10000
    );
});
