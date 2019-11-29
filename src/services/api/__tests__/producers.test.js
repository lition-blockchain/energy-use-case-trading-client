import Axios from 'axios';
import {
    addOwnedProducerOffer,
    getCurrentMarketPrice,
    getCurrentProducer,
    getOwnedProducerOffer,
    getOwnedProducerOffersHistory,
    getProducer,
    getProducerHistory,
    getProducers,
    selectProducer
} from '../producers';
import { LIMIT } from '../../../constants';

describe('Producers API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
        Axios.post.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
        Axios.post.mockClear();
    });

    it('should provide method for getting specific producer (when sold out flag is false for current user)', async () => {
        Axios.get
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        user: {
                            workingPrice: 2.5,
                            showSoldOutPowerPlants: false
                        }
                    }
                })
            )
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        producer: {
                            deltaPrice: 2,
                            street: 'October',
                            postcode: '230000',
                            city: 'Seit',
                            country: 'Zakovia',
                            productionOfLastDay: 200,
                            energyPurchased: 100,
                            dlAddress: '0x1',
                            status: 'sold out'
                        }
                    }
                })
            );

        const producer = await getProducer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/get');
        expect(producer).toEqual({
            data: {
                producer: {
                    deltaPrice: 2,
                    annualProduction: 200,
                    city: 'Seit',
                    country: 'Zakovia',
                    dlAddress: '0x1',
                    energyPurchased: 100,
                    ethereumAddress: '0x1',
                    location: 'October, 230000 Seit, Zakovia',
                    postcode: '230000',
                    productionOfLastDay: 200,
                    purchased: 100,
                    street: 'October',
                    price: 4.5,
                    status: 'active'
                }
            }
        });
    });

    it('should provide method for getting specific producer (when sold out flag is true for current user)', async () => {
        Axios.get
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        user: {
                            workingPrice: 2.5,
                            showSoldOutPowerPlants: true
                        }
                    }
                })
            )
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        producer: {
                            deltaPrice: 2,
                            street: 'October',
                            postcode: '230000',
                            city: 'Seit',
                            country: 'Zakovia',
                            productionOfLastDay: 200,
                            energyPurchased: 100,
                            dlAddress: '0x1',
                            status: 'sold out'
                        }
                    }
                })
            );

        const producer = await getProducer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/get');
        expect(producer).toEqual({
            data: {
                producer: {
                    deltaPrice: 2,
                    annualProduction: 200,
                    city: 'Seit',
                    country: 'Zakovia',
                    dlAddress: '0x1',
                    energyPurchased: 100,
                    ethereumAddress: '0x1',
                    location: 'October, 230000 Seit, Zakovia',
                    postcode: '230000',
                    productionOfLastDay: 200,
                    purchased: 100,
                    street: 'October',
                    price: 4.5,
                    status: 'sold out'
                }
            }
        });
    });

    // TODO uncomment after completing end-point
    it.skip('should provide method for getting producer history', () => {
        Axios.get.mockReturnValue(jest.fn);

        getProducerHistory('testId');

        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/offer/history', {
            params: { limit: 10, offset: 0 }
        });
    });

    it('should provide method for selecting producer', () => {
        Axios.post.mockReturnValue(jest.fn);

        selectProducer('testId');

        expect(Axios.post).toHaveBeenCalledWith('/api/producers/select', {
            producerID: 'testId'
        });
    });

    it('should provide method for getting current producer', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { user: { currentProducerId: 'TEST' } }
            })
        );

        await getCurrentProducer();
        // TODO getUserData two times (for currentProducerId and for workingPrice)
        // TODO need improve this part
        expect(Axios.get).toHaveBeenCalledTimes(3);

        const [[firstUserDataCall], [secondUserDataCall], [producerCall]] = Axios.get.mock.calls;
        expect(firstUserDataCall).toBe('/api/user/getUserData');
        expect(secondUserDataCall).toBe('/api/user/getUserData');
        expect(producerCall).toBe('/api/producers/TEST/get');
    });

    it('should provide method for getting producers list (when sold out flag is false for current user)', async () => {
        Axios.get
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        user: {
                            workingPrice: 2.5,
                            showSoldOutPowerPlants: false
                        }
                    }
                })
            )
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        producers: [
                            {
                                deltaPrice: 3.1,
                                street: 'October',
                                postcode: '230000',
                                city: 'Seit',
                                country: 'Zakovia',
                                productionOfLastDay: 200,
                                energyPurchased: 100,
                                dlAddress: '0x1',
                                status: 'sold out'
                            },
                            {
                                deltaPrice: 5.3,
                                street: 'October',
                                postcode: '230000',
                                city: 'Seit',
                                country: 'Zakovia',
                                productionOfLastDay: 200,
                                energyPurchased: 100,
                                dlAddress: '0x2',
                                status: 'standard'
                            }
                        ]
                    }
                })
            );

        const producers = await getProducers({ page: 5, filter: undefined });
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct', {
            params: {
                limit: LIMIT,
                offset: LIMIT * 5
            }
        });
        expect(producers).toEqual({
            data: {
                producers: [
                    {
                        deltaPrice: 3.1,
                        price: 5.6,
                        street: 'October',
                        postcode: '230000',
                        city: 'Seit',
                        country: 'Zakovia',
                        productionOfLastDay: 200,
                        energyPurchased: 100,
                        dlAddress: '0x1',
                        status: 'active'
                    },
                    {
                        deltaPrice: 5.3,
                        price: 2.5,
                        street: 'October',
                        postcode: '230000',
                        city: 'Seit',
                        country: 'Zakovia',
                        productionOfLastDay: 200,
                        energyPurchased: 100,
                        dlAddress: '0x2',
                        status: 'standard'
                    }
                ]
            }
        });
    });

    it('should provide method for getting producers list (when sold out flag is true for current user)', async () => {
        Axios.get
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        user: {
                            workingPrice: 2.5,
                            showSoldOutPowerPlants: true
                        }
                    }
                })
            )
            .mockReturnValueOnce(
                Promise.resolve({
                    data: {
                        producers: [
                            {
                                deltaPrice: 3.1,
                                street: 'October',
                                postcode: '230000',
                                city: 'Seit',
                                country: 'Zakovia',
                                productionOfLastDay: 200,
                                energyPurchased: 100,
                                dlAddress: '0x1',
                                status: 'sold out'
                            },
                            {
                                deltaPrice: 5.3,
                                street: 'October',
                                postcode: '230000',
                                city: 'Seit',
                                country: 'Zakovia',
                                productionOfLastDay: 200,
                                energyPurchased: 100,
                                dlAddress: '0x2',
                                status: 'standard'
                            }
                        ]
                    }
                })
            );

        const producers = await getProducers({ page: 5, filter: 'test1' });
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/direct?type=test1', {
            params: {
                limit: LIMIT,
                offset: LIMIT * 5
            }
        });
        expect(producers).toEqual({
            data: {
                producers: [
                    {
                        deltaPrice: 3.1,
                        price: 5.6,
                        street: 'October',
                        postcode: '230000',
                        city: 'Seit',
                        country: 'Zakovia',
                        productionOfLastDay: 200,
                        energyPurchased: 100,
                        dlAddress: '0x1',
                        status: 'sold out'
                    },
                    {
                        deltaPrice: 5.3,
                        price: 2.5,
                        street: 'October',
                        postcode: '230000',
                        city: 'Seit',
                        country: 'Zakovia',
                        productionOfLastDay: 200,
                        energyPurchased: 100,
                        dlAddress: '0x2',
                        status: 'standard'
                    }
                ]
            }
        });
    });

    it('should provide method for getting owned producer offer info', () => {
        getOwnedProducerOffer('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/user/testId/producer/getOwnedProducer');
    });

    it('should provide method for adding offer of owned producer', () => {
        addOwnedProducerOffer('testId', { id: 'testOfferId' });
        expect(Axios.post).toHaveBeenCalledWith('/api/producers/testId/set', { id: 'testOfferId' });
    });

    it('should provide method for getting current market price', () => {
        getCurrentMarketPrice();
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/1/get');
    });

    it('should provide method for getting owned producer offers history', () => {
        getOwnedProducerOffersHistory('testId');
        expect(Axios.get).toHaveBeenCalledWith('/api/producers/testId/offer/history');
    });
});
