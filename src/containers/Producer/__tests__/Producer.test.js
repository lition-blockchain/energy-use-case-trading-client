import React from 'react';
import { Provider } from 'react-redux';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import ProducerContainer, { Producer } from '../Producer';
import { Button, HelpIcon, ProducerInfo } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';
import * as producersActions from '../../../action_performers/producers';
import * as appActions from '../../../action_performers/app';
import * as notificationActions from '../../../action_performers/notifications';
import * as usersActions from '../../../action_performers/users';
import { CONTRACT_STATUSES } from '../../../constants';

const mockStore = configureMockStore();
const store = mockStore({
    Users: {
        profile: {
            data: {
                user: {
                    id: 0,
                    firstName: 'string',
                    lastName: 'string',
                    email: 'string',
                    currentProducerId: 1,
                    lastBillAvailable: true,
                    lastBillAmount: '35.24',
                    lastBillDate: 'December;',
                    userStatus: 'string',
                    workingPrice: 2.3,
                    contract: {
                        statusCode: CONTRACT_STATUSES.active,
                        statusCodeTitle: 'In Belieferung'
                    }
                }
            }
        }
    },
    Producers: {
        producer: {
            data: {
                name: 'Peter Producer',
                price: 2.4,
                annualProduction: 3000,
                purchased: 1300,
                capacity: 8,
                dates: 'Sep 12 - Feb 22',
                tradingStrategy: false,
                id: 1,
                complete: false,
                plantType: 'solar',
                picture: 'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg',
                location: 'Lippendorf, Neukieritzsch',
                ethereumAddress: '123',
                description: 'desc',
                status: 'active'
            },
            loading: false,
            error: null
        },
        selectedProducer: {
            data: {},
            loading: false,
            error: null
        }
    },
    App: {
        localization: {
            data: {
                locale: 'en'
            }
        }
    }
});

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const commonProps = {
    match: { params: { producerId: '1' } }
};

const props = {
    ...Producer.defaultProps,
    producer: {
        id: 1,
        name: 'test',
        status: 'active'
    },
    user: { id: 1, contract: { statusCode: CONTRACT_STATUSES.active } },
    selectedProducer: {},
    error: null
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <ProducerContainer {...commonProps} context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<Producer {...commonProps} {...props} context={context} />);
}

describe('<Producer /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        context.intl.formatMessage.mockReturnValue('test');
        producersActions.performGetProducer = jest.fn();
        producersActions.performSelectProducer = jest.fn();
        appActions.performSetupBreadcrumbs = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        usersActions.performGetUserData = jest.fn();
        notificationActions.performPushNotification = jest.fn();
    });

    it(`should contains following controls:
        - <section> with class "producer-page";
        - 1 <h1>;
        - 2 <Button> component";
        - 1 <ProducerInfo> component";`, () => {
        const component = renderContainer();

        expect(component.find('section.producer-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find(ProducerInfo)).toHaveLength(1);
        expect(component.find(Button)).toHaveLength(2);
        expect(component.find(HelpIcon)).toHaveLength(0);
        expect(component.find('strong[aria-label="Producer Status"]')).toHaveLength(0);
    });

    it('should disable "Select Producer" button if producer has "sold out" status', () => {
        const component = renderComponent();
        component.setProps({
            producer: {
                id: 1,
                name: 'test',
                status: 'sold out'
            }
        });
        expect(component.find(HelpIcon)).toHaveLength(1);
        expect(component.find('strong[aria-label="Producer Status"]')).toHaveLength(1);
        expect(
            component
                .find(Button)
                .at(1)
                .props('disabled')
        ).toBeTruthy();
    });

    it('should call prepare common function', () => {
        const component = renderContainer();
        const info = component.find(ProducerInfo).at(0);
        expect(info.props()).toEqual({
            description: 'desc',
            details: {
                annualProduction: 3000,
                capacity: 8,
                energyType: 'Solar',
                location: 'Vaasa, Finland',
                name: 'Peter Producer',
                price: 2.4,
                purchased: 1300,
                selectedSince: 'Sep 12 - Feb 22',
                ethereumAddress: '123',
                marketPrice: 2.3,
                status: 'active'
            },
            labels: {
                annualProduction: 'Annual Production',
                capacity: 'Peak Capacity',
                energyType: 'Type of energy',
                location: 'Location',
                name: 'Name',
                price: 'Price',
                marketPrice: 'vs. market price of',
                purchased: 'Energy purchased',
                selectedSince: 'Selected since',
                ethereumAddress: 'Ethereum Address'
            },
            picture: 'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg'
        });
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Producers: {
                producer: {
                    data: 'test_producer_data',
                    error: 'test_producer_error',
                    loading: false
                },
                selectedProducer: {
                    data: 'test_selected_data',
                    error: 'test_error',
                    loading: 'test_loading'
                }
            },
            Users: {
                profile: {
                    data: { user: 'user_data' },
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
            }
        };
        const props = Producer.mapStateToProps(stateDummy);
        expect(props).toEqual({
            error: 'test_producer_error',
            errorSelect: 'test_error',
            loading: 'test_loading',
            locale: 'en',
            producer: 'test_producer_data',
            user: 'user_data',
            selectedProducer: 'test_selected_data'
        });
    });

    it('should perform related actions on lifecycle step', () => {
        renderContainer();

        expect(usersActions.performGetUserData.mock.calls.length).toEqual(1);
        expect(producersActions.performGetProducer.mock.calls.length).toEqual(1);
        const [[arg1]] = producersActions.performGetProducer.mock.calls;
        expect(arg1).toEqual('1');
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(2);
        const [, [bArg1]] = appActions.performSetupBreadcrumbs.mock.calls;
        expect(bArg1).toEqual([
            { icon: faShoppingCart, id: 'buy_energy', label: 'Buy Energy', path: '/buy_energy' },
            { id: 'producer', label: 'Peter Producer', path: '/buy_energy/producer/1' }
        ]);

        const component = renderComponent();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(2);
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(4);
        component.setProps({ producer: { id: 1, name: 'Test' } });
        component.setProps({ producer: { id: 2, name: 'Test' } });
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(6);
        component.setProps({ producer: { id: 2, name: 'Test' } });
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(6);
    });

    it('should provide possibility navigate to producers list', () => {
        const component = renderComponent();
        component.setContext(context);
        const back = component.find(Button).at(0);
        back.props().onClick();

        const { push } = context.router.history;
        expect(push.mock.calls.length).toEqual(1);
        const [[route]] = push.mock.calls;
        expect(route).toEqual('/buy_energy');
    });

    it('should provide possibility to select producer', () => {
        const component = renderComponent();
        component.setContext(context);
        const select = component.find(Button).at(1);
        select.props().onClick();

        expect(producersActions.performSelectProducer.mock.calls.length).toEqual(1);
        const [[arg]] = producersActions.performSelectProducer.mock.calls;
        expect(arg).toEqual(1);

        component.setProps({ selectedProducer: { id: 1, message: 'Test' } });
        const { push } = context.router.history;
        expect(push.mock.calls.length).toEqual(1);
        const [[route]] = push.mock.calls;
        expect(route).toEqual('/');

        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[success]] = notificationActions.performPushNotification.mock.calls;
        expect(success).toEqual({ message: 'test', type: 'success' });

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(2);
        const [, [error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({ message: 'test', type: 'error' });
    });

    it('should open buy energy page', () => {
        const component = renderComponent();
        component.setContext(context);

        component.find('BackLink').simulate('click', { preventDefault: jest.fn() });
        expect(context.router.history.push).toHaveBeenCalledWith('/buy_energy');
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const producer = renderComponent();

        producer.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        producer.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should setup translated breadcrumbs when locale changed', () => {
        const producer = renderComponent();

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(2);

        producer.setProps({
            locale: 'de'
        });

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(3);
    });
});
