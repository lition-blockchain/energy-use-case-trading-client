import React from 'react';
import { Provider } from 'react-redux';
import DirectTradingContainer, { DirectTrading } from '../DirectTrading';
import { mountWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import * as notificationActions from '../../../action_performers/notifications';
import * as txActions from '../../../action_performers/transactions';
import * as appActions from '../../../action_performers/app';

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const tradePositionsDummy = [
    {
        offerAddressUrl: 'https://ropsten.etherscan.io/address/0x8927Ef66Df3ab92560010482a685D113F7250305',
        offerAddress: '0x8927Ef66Df3ab92560010482a685D113F7250305',
        producerUrl: null,
        producerName: '',
        offerIssued: 'May 16, 2018 03:00',
        offerIssuedTimestamp: 1526428800,
        validOn: '--',
        energyOffered: '--',
        energyAvailable: '10',
        energyAvailableFloat: 10,
        price: '5,70'
    },
    {
        offerAddressUrl: 'https://ropsten.etherscan.io/address/0x04cCa77c4FdfDFa588018dE41C86fE809A847C3A',
        offerAddress: '0x04cCa77c4FdfDFa588018dE41C86fE809A847C3A',
        producerUrl: null,
        producerName: '',
        offerIssued: 'May 17, 2018 03:00',
        offerIssuedTimestamp: 1526518800,
        validOn: '--',
        energyOffered: '--',
        energyAvailable: '20',
        energyAvailableFloat: 20,
        price: '2,50'
    },
    {
        offerAddressUrl: 'https://ropsten.etherscan.io/address/0x366479cA03c80aDfD47147d72D329A7B8B7Ea40F',
        offerAddress: '0x366479cA03c80aDfD47147d72D329A7B8B7Ea40F',
        producerUrl: null,
        producerName: '',
        offerIssued: 'May 18, 2018 03:00',
        offerIssuedTimestamp: 1526605200,
        validOn: '--',
        energyOffered: '--',
        energyAvailable: '30',
        energyAvailableFloat: 30,
        price: '3,10'
    }
];
const mockStore = configureMockStore();
const store = mockStore({
    Transactions: {
        openTradePositions: {
            data: [],
            loading: false,
            error: null
        },
        availableAddresses: {
            data: {
                addresses: ['0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf']
            },
            loading: false,
            error: null
        },
        ledgerNetworks: {
            loading: false,
            data: {
                selectedLedgerNetwork: 'ethereumRopsten',
                ethereumRopsten: { addresses: ['contractAddressTest'] }
            },
            error: null
        },
        performedTransaction: {
            data: {
                txHash: '0x4d0f7b1fc6c0dee1475b37cfdb264e4ca1bd0142d4360bfaec1e7efc031ac70f',
                txHashUrl: 'testUrl'
            },
            loading: false,
            error: null
        },
        ledgerStatus: {
            loading: false,
            data: {
                status: 'success'
            },
            error: null
        }
    },
    Users: {
        profile: {
            loading: false,
            data: {
                user: {
                    id: 1,
                    ledger: 'ethereumRopsten'
                }
            },
            error: null
        }
    }
});

const props = {
    openTradePositions: [],
    availableAddresses: ['0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'],
    loading: false,
    error: null,
    ledgerStatus: {
        status: 'success'
    },
    ledgerNetworks: {
        selectedLedgerNetwork: 'ethereumRopsten',
        ethereumRopsten: { addresses: ['contractAddressTest'] }
    },
    user: {
        id: 1,
        ledger: 'ethereumRopsten'
    },
    performedTransaction: {
        txHash: '0x4d0f7b1fc6c0dee1475b37cfdb264e4ca1bd0142d4360bfaec1e7efc031ac70f',
        txHashUrl: 'testUrl'
    }
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <DirectTradingContainer context={context} />
        </Provider>
    );
}

function renderComponent() {
    return mountWithIntl(<DirectTrading {...props} context={context} />);
}

describe('<DirectTrading /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();

        txActions.performGetAvailableAddresses = jest.fn();
        txActions.performGetOpenTradePositions = jest.fn();
        txActions.performPerformTransaction = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        notificationActions.performPushNotification = jest.fn();
    });

    it(`should contains following controls:
        - 1 <section> element with "direct-trading-page";
        - 1 <h1> element;`, () => {
        const component = renderContainer();

        expect(component.find('section.direct-trading-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        // TODO add Alert, OpenTradePositionsTable and ConfigurationForm check
    });

    it('should renders with ConfigurationForm', () => {
        const component = renderComponent();

        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component.update();
        expect(component.find('ConfigurationForm')).toHaveLength(1);
    });

    it('should renders with TradePositionsList', () => {
        const component = renderComponent();

        component.setState({ isMetaMaskInstalled: true, isConfigured: true });
        component.update();
        expect(component.find('TradePositionsList')).toHaveLength(1);
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Transactions: {
                openTradePositions: {
                    data: [],
                    error: null,
                    loading: false
                },
                availableAddresses: {
                    data: { addresses: 'test_data' },
                    error: 'test_error',
                    loading: 'test_loading'
                },
                ledgerNetworks: {
                    loading: false,
                    data: 'test_networks_data',
                    error: null
                },
                performedTransaction: {
                    data: 'test_performed_transaction_data',
                    loading: false,
                    error: 'test_performed_transaction_error'
                },
                ledgerStatus: {
                    loading: false,
                    data: 'test_status_data',
                    error: null
                }
            },
            Users: {
                profile: {
                    loading: false,
                    data: {
                        user: 'test_user_data'
                    },
                    error: null
                }
            }
        };
        const props = DirectTrading.mapStateToProps(stateDummy);
        expect(props).toEqual({
            openTradePositions: [],
            availableAddresses: 'test_data',
            error: 'test_error',
            errorPerform: 'test_performed_transaction_error',
            loading: 'test_loading',
            ledgerStatus: 'test_status_data',
            ledgerNetworks: 'test_networks_data',
            user: 'test_user_data',
            performedTransaction: 'test_performed_transaction_data'
        });
    });

    it('should reset formData when back link was clicked', () => {
        const component = renderComponent();

        component.setState({
            isMetaMaskInstalled: true,
            isConfigured: true,
            formData: { blockChain: 'ethereum', address: 'abc' }
        });
        component.update();
        component
            .find('TradePositionsList')
            .props()
            .onBackClick();

        expect(component.instance().state.formData).toEqual({ blockChain: 'ethereum', address: '' });
    });

    it('should not calls performGetOpenTradePositions if formData is not valid', () => {
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        const component = renderContainer();

        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component
            .find('ConfigurationForm')
            .props()
            .onSubmit({ blockChain: 'test', address: '' });

        expect(txActions.performGetOpenTradePositions).not.toHaveBeenCalled();
        console.warn.mockRestore();
    });

    it('should calls performGetOpenTradePositions if formData is valid', () => {
        const component = renderComponent();

        component.setProps({
            ledgerStatus: { status: 'pending' }
        });
        component.setState({ isMetaMaskInstalled: true, isConfigured: false });
        component.setProps({
            ledgerStatus: { status: 'success' }
        });
        component
            .find('ConfigurationForm')
            .props()
            .onSubmit({ blockChain: 'test', address: 'abc' });
        expect(txActions.performGetOpenTradePositions).toHaveBeenCalledWith(1, 'ethereumRopsten');
    });

    it('should perform related actions on did mount step', () => {
        const component = renderComponent();
        expect(txActions.performGetAvailableAddresses.mock.calls.length).toEqual(1);
        expect(txActions.performGetOpenTradePositions.mock.calls.length).toEqual(0);

        component.setState({ isConfigured: true });
        expect(txActions.performGetOpenTradePositions.mock.calls.length).toEqual(1);

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({
            message:
                "Can't load transactions or ledger network data from Nordic Energy web server. Please contact administrator to resolve the error.",
            type: 'error'
        });
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const directTrading = renderComponent();

        directTrading.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        directTrading.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should filter trade positions by trade volume', () => {
        const directTrading = renderComponent();

        directTrading.setState({
            isMetaMaskInstalled: true,
            isConfigured: true
        });
        directTrading.setProps({ openTradePositions: tradePositionsDummy });
        directTrading
            .find('TradePositionsList')
            .props()
            .onTradeVolumeChange({ target: { value: '15,50' } });
        directTrading.update();
        expect(directTrading.find('TradePositionsList').props().tradePositions).toEqual([
            tradePositionsDummy[1],
            tradePositionsDummy[2]
        ]);
    });

    it('should filter trade positions by date', () => {
        const directTrading = renderComponent();

        directTrading.setState({
            isMetaMaskInstalled: true,
            isConfigured: true
        });
        directTrading.setProps({ openTradePositions: tradePositionsDummy });
        directTrading
            .find('TradePositionsList')
            .props()
            .onDateFilterChange({ value: 1526425200 });
        directTrading.update();
        expect(directTrading.find('TradePositionsList').props().tradePositions).toEqual([tradePositionsDummy[0]]);
    });

    it('should filter trade positions by date and trade volume', () => {
        const directTrading = renderComponent();

        directTrading.setState({
            isMetaMaskInstalled: true,
            isConfigured: true
        });
        directTrading.setProps({ openTradePositions: tradePositionsDummy });
        directTrading
            .find('TradePositionsList')
            .props()
            .onTradeVolumeChange({ target: { value: '15,50' } });
        directTrading
            .find('TradePositionsList')
            .props()
            .onDateFilterChange({ value: 1526425200 });
        directTrading.update();
        expect(directTrading.find('TradePositionsList').props().tradePositions).toEqual([]);
    });

    it('should show confirmation dialog with message', () => {
        const component = renderComponent();

        component.setProps({
            performedTransaction: {
                txHash: 'new_tx_hash',
                txHashUrl: 'new_tx_hash_url'
            },
            loading: false
        });

        expect(component.state().showConfirmationDialog).toBeTruthy();
    });

    it('should close confirmation dialog', () => {
        const component = renderComponent();

        component.setState({
            showConfirmationDialog: true
        });

        component
            .find('Confirm')
            .at(0)
            .props()
            .onConfirm();
        expect(component.state().showConfirmationDialog).toBeFalsy();
    });

    it('should call performPerformTransaction callback', () => {
        const component = renderComponent();

        component.setState({
            isConfigured: true,
            isMetaMaskInstalled: true,
            formData: {
                address: 'testAddress'
            }
        });
        component.setProps({ openTradePositions: tradePositionsDummy });

        component
            .find('TradePosition')
            .at(0)
            .props()
            .onPerform(tradePositionsDummy[0]);
        expect(txActions.performPerformTransaction).toHaveBeenCalledWith(
            tradePositionsDummy[0],
            'contractAddressTest',
            'ethereumRopsten',
            'testAddress'
        );
    });

    it('should show notification in case if wrong ledger network is chosen', () => {
        const component = renderComponent();
        component.setProps({
            ledgerNetworks: {
                selectedLedgerNetwork: 'wrongLedger',
                ethereumRopsten: { addresses: ['contractAddressTest'] }
            }
        });
        component
            .find('ConfigurationForm')
            .props()
            .onSubmit({ blockChain: 'test', address: 'abc' });
        expect(notificationActions.performPushNotification).toHaveBeenCalledWith({
            message: 'Wrong ledger network is chosen',
            type: 'error'
        });
    });
});
