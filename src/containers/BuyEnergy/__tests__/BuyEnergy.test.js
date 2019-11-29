import React from 'react';
import moment from 'moment';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import { CONTRACT_STATUSES } from '../../../constants';
import { BuyEnergy } from '../BuyEnergy';
import { BackLink, ProducerCardsPanel, ProducersFilter } from '../../../components';
import * as producersActionPerformers from '../../../action_performers/producers';
import * as notificationsActionPerformers from '../../../action_performers/notifications';
import * as appActionPerformers from '../../../action_performers/app';

const userDummy = {
    id: 42,
    firstName: 'Bruce',
    lastName: 'Wayne',
    email: 'batman@example.com',
    street: 'justice-league',
    streetNumber: '5',
    postcode: '10115',
    city: 'Berlin',
    birthday: moment('2018-08-30').unix(),
    basePrice: 49.08,
    workingPrice: 24.19,
    country: 'Germany',
    lastBillAvailable: true,
    lastBillAmount: '35,60',
    lastBillDate: 'April',
    IBAN: 'DE91100000000123456789',
    BIC: 'MARKDEF1100',
    status: 'delivery_net',
    statusCode: CONTRACT_STATUSES.active,
    statusCodeTitle: 'In Belieferung',
    showSoldOutPowerPlants: true,
    allowPasswordChange: false,
    currentProducerId: 13,
    ledger: 'ethereumRopsten'
};
const producersDummy = [
    { id: 0, price: 2.9, plantType: 'default', name: 'John Doe', status: 'standard' },
    { id: 1, price: 2, plantType: 'wind', name: 'Peter Producer', status: 'sold out' },
    { id: 2, price: 1, plantType: 'biomass', name: 'Jeremy', status: 'active' },
    { id: 3, price: 5, plantType: 'wind', name: 'Blark', status: 'active' },
    { id: 4, price: 1, plantType: 'solar', name: 'Alice', status: 'active' },
    { id: 5, price: 67, plantType: 'specific', name: 'Dr. Doom', status: 'active' }
];
const currentProducerDummy = producersDummy[1];
const routerStub = {
    history: {
        push: jest.fn()
    }
};

function renderComponent(
    {
        user = userDummy,
        currentProducerLoading = false,
        currentProducer = currentProducerDummy,
        producersLoading = false,
        producers = producersDummy,
        hasNextProducers = false,
        ...otherProps
    } = {},
    mountFn = shallowWithIntl
) {
    return mountFn(
        <BuyEnergy
            user={user}
            currentProducerLoading={currentProducerLoading}
            currentProducer={currentProducer}
            producersLoading={producersLoading}
            producers={producers}
            hasNextProducers={hasNextProducers}
            {...otherProps}
        />,
        {
            context: { router: routerStub }
        }
    );
}

describe('<BuyEnergy /> container', () => {
    jest.useFakeTimers();

    const mainContainerElement = document.createElement('div');

    beforeAll(() => {
        jest.spyOn(producersActionPerformers, 'performGetCurrentProducer').mockImplementation(jest.fn());
        jest.spyOn(producersActionPerformers, 'performGetProducers').mockImplementation(jest.fn());
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        jest.spyOn(appActionPerformers, 'performSetupLoaderVisibility').mockImplementation(jest.fn());
        jest.spyOn(appActionPerformers, 'performSetupBreadcrumbs').mockImplementation(jest.fn());
        jest.spyOn(document, 'getElementById').mockReturnValue(mainContainerElement);
        jest.spyOn(mainContainerElement, 'addEventListener');
        jest.spyOn(mainContainerElement, 'removeEventListener');
    });

    afterEach(() => {
        producersActionPerformers.performGetProducers.mockClear();
        appActionPerformers.performSetupLoaderVisibility.mockClear();
        appActionPerformers.performSetupBreadcrumbs.mockClear();
        routerStub.history.push.mockClear();
    });

    it(`should renders without errors and contains following elements:
        - <section.buy-energy-page> element;
        - <header.buy-energy-page-header> element;
        - <h1> element;
        - <h2> element;
        - <BackLink> element;
        - <ProducersFilter> element;
        - <ProducerCardsPanel> element;`, () => {
        const buyEnergy = renderComponent({
            loading: true,
            producersLoading: true
        });
        const handleScrollMock = buyEnergy.instance().scrollHandler;

        expect(mainContainerElement.addEventListener).toHaveBeenCalledWith(
            'scroll',
            buyEnergy.instance().scrollHandler
        );

        expect(buyEnergy.find('section.buy-energy-page')).toHaveLength(1);
        expect(buyEnergy.find('header.buy-energy-page-header')).toHaveLength(1);
        expect(buyEnergy.find('h1')).toHaveLength(1);
        expect(buyEnergy.find('h2')).toHaveLength(1);
        expect(buyEnergy.find(BackLink)).toHaveLength(1);
        expect(buyEnergy.find(ProducerCardsPanel)).toHaveLength(1);
        expect(buyEnergy.find(ProducersFilter)).toHaveLength(1);

        expect(buyEnergy.find(ProducerCardsPanel).props().producers).toEqual([
            { id: 0, name: 'John Doe', plantType: 'Default', price: 2.9, status: null },
            { id: 1, name: 'Peter Producer', plantType: 'Wind', price: 2, status: 'sold out' },
            { id: 2, name: 'Jeremy', plantType: 'Biomass', price: 1, status: null },
            { id: 3, name: 'Blark', plantType: 'Wind', price: 5, status: null },
            { id: 4, name: 'Alice', plantType: 'Solar', price: 1, status: null },
            { id: 5, name: 'Dr. Doom', plantType: 'Other', price: 67, status: null }
        ]);

        buyEnergy.unmount();
        expect(mainContainerElement.removeEventListener).toHaveBeenCalledWith('scroll', handleScrollMock);
    });

    it('should return correct props', () => {
        const stateMock = {
            Producers: {
                currentProducer: {
                    data: producersDummy[1],
                    error: null,
                    loading: false
                },
                producers: {
                    data: {
                        total: 10,
                        entries: producersDummy
                    },
                    error: null,
                    loading: false
                }
            },
            App: {
                localization: {
                    data: {
                        locale: 'en'
                    }
                }
            },
            Users: {
                profile: {
                    data: {
                        user: { id: 1 }
                    },
                    loading: false
                }
            }
        };
        const props = BuyEnergy.mapStateToProps(stateMock);

        expect(props).toEqual({
            user: { id: 1 },
            locale: 'en',
            error: null,
            loading: false,
            currentProducer: producersDummy[1],
            producersLoading: false,
            producers: producersDummy,
            hasNextProducers: true
        });
    });

    it('should call performGetProducers on did mount hook', () => {
        renderComponent({ producers: [] });

        expect(producersActionPerformers.performGetProducers).toHaveBeenCalled();
    });

    it('should call performGetProducers on did mount hook even if producers list is not empty', () => {
        renderComponent();

        expect(producersActionPerformers.performGetProducers).toHaveBeenCalled();
    });

    it('should calls performGetProducers when page increase', () => {
        const buyEnergy = renderComponent({
            loading: true,
            producersLoading: true
        });

        buyEnergy.setState({ page: 1 });
        expect(producersActionPerformers.performGetProducers).toHaveBeenCalledWith({ page: 1, filter: null });
    });

    it('should calls performGetProducers with selected filter and first page', () => {
        const buyEnergy = renderComponent({
            loading: true,
            producersLoading: true
        });

        buyEnergy.setState({
            page: 2
        });

        buyEnergy
            .find('ProducersFilter')
            .props()
            .onChange(['wind']);
        buyEnergy.instance().componentDidUpdate({}, {});
        expect(producersActionPerformers.performGetProducers).toHaveBeenCalledWith({ page: 0, filter: ['wind'] });
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const buyEnergy = renderComponent();

        buyEnergy.setProps({ loading: true, producersLoading: true });
        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        buyEnergy.setProps({ loading: false, producersLoading: false });
        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should call performPushNotification if error has occurred', () => {
        const buyEnergy = renderComponent();

        buyEnergy.setProps({ error: { message: 'TEST' } });
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            message:
                "Can't load producers data from Nordic Energy web server. Please contact administrator to resolve the error.",
            type: 'error'
        });
    });

    it('should not update state if scroll up', () => {
        const buyEnergy = renderComponent({ hasNextProducers: true });
        const scrollEventMock = new Event('scroll', {
            target: mainContainerElement
        });

        buyEnergy.instance().lastScrollTop = 1;

        mainContainerElement.dispatchEvent(scrollEventMock);
        jest.runAllTimers();

        expect(buyEnergy.state().page).toBe(0);
    });

    it('should update state after scroll', () => {
        const buyEnergy = renderComponent({ hasNextProducers: true });
        const scrollEventMock = new Event('scroll', {
            target: mainContainerElement
        });

        mainContainerElement.scrollTop = 2;
        buyEnergy.instance().lastScrollTop = 1;

        mainContainerElement.dispatchEvent(scrollEventMock);
        jest.runAllTimers();

        expect(buyEnergy.state().page).toBe(1);
    });

    it('should go to the trading page when back link was clicked', () => {
        const buyEnergy = renderComponent();

        buyEnergy.find('BackLink').simulate('click', { preventDefault: jest.fn() });
        expect(routerStub.history.push).toHaveBeenCalledWith('/');
    });

    it('should opens producer page', () => {
        const buyEnergy = renderComponent();

        buyEnergy
            .find('ProducerCardsPanel')
            .props()
            .onProducerClick(1);
        expect(routerStub.history.push).toHaveBeenCalledWith('/buy_energy/producer/1');
    });

    it('should setup translated breadcrumbs when locale changed', () => {
        const buyEnergy = renderComponent();

        expect(appActionPerformers.performSetupBreadcrumbs).toHaveBeenCalledTimes(2);

        buyEnergy.setProps({
            locale: 'de'
        });

        expect(appActionPerformers.performSetupBreadcrumbs).toHaveBeenCalledTimes(3);
    });
});
