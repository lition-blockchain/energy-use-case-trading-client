import React from 'react';
import { Provider } from 'react-redux';
import { CONTRACT_STATUSES } from '../../../constants';
import OverviewContainer, { Overview } from '../Overview';
import { NavigationCardsPanel, RecentTransactions } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import * as usersActions from '../../../action_performers/users';
import * as notificationActions from '../../../action_performers/notifications';
import * as txActions from '../../../action_performers/transactions';
import * as appActions from '../../../action_performers/app';
import { formatFloat } from '../../../services/formatter';

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    Users: {
        profile: {
            data: {
                user: {
                    id: 1,
                    contract: {
                        statusCode: CONTRACT_STATUSES.active,
                        statusCodeTitle: 'success'
                    }
                }
            }
        }
    },
    Transactions: {
        recentTransactions: {
            data: {
                currentBalance: {
                    date: 1523707200,
                    balance: 40.4
                },
                transactions: [
                    {
                        id: '1',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.81,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '2',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.081,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '3',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.8,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '4',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.8,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '5',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.8,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '6',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.8,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '7',
                        date: 1523707200,
                        producerName: 'Alice',
                        energyAmount: 7.13,
                        description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                        transactionAmount: 0.8,
                        details: {
                            status: 'success',
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    }
                ]
            },
            loading: false,
            error: null
        }
    }
});

const props = {
    recentTransactions: {
        currentBalance: {
            date: 1523707200,
            balance: 40.4
        },
        transactions: [
            {
                id: '1',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.81,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '2',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.081,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '3',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.8,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '4',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.8,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '5',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.8,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '6',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.8,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '7',
                date: 1523707200,
                producerName: 'Alice',
                energyAmount: 7.13,
                description: `Bought ${formatFloat(7.13)} kWh from "Alice"`,
                transactionAmount: 0.8,
                details: {
                    status: 'success',
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            }
        ]
    },
    user: { id: 'testId', contract: { statusCode: CONTRACT_STATUSES.active } },
    loading: false,
    error: null
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <OverviewContainer context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<Overview {...props} context={context} />);
}

describe('<Overview /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        usersActions.performGetUserData = jest.fn();
        txActions.performGetRecentTransactions = jest.fn();
        notificationActions.performPushNotification = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        jest.useFakeTimers();
    });

    it(`should contains following controls:
        - 1 <NavigationCardsPanel /> component;
        - 1 <RecentTransactions /> component;
        - <section> element with class "overview-page";`, () => {
        const component = renderContainer();

        expect(component.find('section.overview-page')).toHaveLength(1);
        expect(component.find(NavigationCardsPanel)).toHaveLength(1);
        expect(component.find(RecentTransactions)).toHaveLength(1);
    });

    it('should call prepare common function', () => {
        const component = renderContainer();
        const table = component.find(RecentTransactions).at(0);
        const tableProps = table.props();
        delete tableProps.onButtonClick;
        expect(tableProps).toEqual({
            currentBalance: { ...props.recentTransactions.currentBalance },
            labels: {
                contractWaitingStatusCode:
                    'Your contract with Nordic Energy was successfull, now we are waiting until the switch from your previous supplier is completed. Further details are available in the "Documents" section. After the switch, Lition is supplying you with Energy and you can choose a producer of your choice.',
                contractOthersStatusCodes:
                    'You are currently not supplied by Nordic Enetgy (Active). Feel free to contact us if you need more detail.',
                recentTransactionsEmptyMessage: 'No transaction information',
                buyEnergy: 'Buy Energy',
                myProducer: 'My Producer',
                recentTransactionsDetailsAmount: 'Amount',
                recentTransactionsDetailsFrom: 'From',
                recentTransactionsDetailsHash: 'Blockchain Transaction',
                recentTransactionsDetailsStatus: 'Status',
                recentTransactionsDetailsPrice: 'Price per kWh',
                recentTransactionsHeaderAmount: 'Amount',
                recentTransactionsHeaderDate: 'Date',
                recentTransactionsHeaderTransaction: 'Transaction',
                recentTransactionsMonthlyBalance: 'Monthly Balance',
                recentTransactionsMore: 'More',
                recentTransactionsTitle: 'Most Recent Transactions',
                recentTransactionsDescriptionBought: 'Bought',
                recentTransactionsDescriptionFrom: 'from',
                sellEnergy: 'Sell Energy',
                loadingErrorMessage:
                    "Can't load transactions data from Lition web server. Please contact administrator to resolve the error."
            },
            transactions: [
                ...props.recentTransactions.transactions.map(tx => ({
                    ...tx,
                    details: { ...tx.details, status: 'Success' }
                }))
            ]
        });

        const cards = component.find(NavigationCardsPanel).at(0);
        const cardsProps = cards.props();
        delete cardsProps.onCardClick;
        expect(cards.props()).toEqual({
            labels: {
                contractWaitingStatusCode:
                    'Your contract with Lition was successfull, now we are waiting until the switch from your previous supplier is completed. Further details are available in the "Documents" section. After the switch, Lition is supplying you with Energy and you can choose a producer of your choice.',
                contractOthersStatusCodes:
                    'You are currently not supplied by Nordic Energy (Active). Feel free to contact us if you need more detail.',
                recentTransactionsEmptyMessage: 'No transaction information',
                buyEnergy: 'Buy Energy',
                myProducer: 'My Producer',
                recentTransactionsDetailsAmount: 'Amount',
                recentTransactionsDetailsFrom: 'From',
                recentTransactionsDetailsHash: 'Blockchain Transaction',
                recentTransactionsDetailsStatus: 'Status',
                recentTransactionsDetailsPrice: 'Price per kWh',
                recentTransactionsHeaderAmount: 'Amount',
                recentTransactionsHeaderDate: 'Date',
                recentTransactionsHeaderTransaction: 'Transaction',
                recentTransactionsMonthlyBalance: 'Monthly Balance',
                recentTransactionsMore: 'More',
                recentTransactionsTitle: 'Most Recent Transactions',
                recentTransactionsDescriptionBought: 'Bought',
                recentTransactionsDescriptionFrom: 'from',
                sellEnergy: 'Sell Energy',
                loadingErrorMessage:
                    "Can't load transactions data from Nordic Energy web server. Please contact administrator to resolve the error."
            },
            navigationCards: [
                { disabled: false, path: '/my_producer', title: 'My Producer', type: 'my_producer' },
                { disabled: false, path: '/buy_energy', title: 'Buy Energy', type: 'buy_energy' },
                { disabled: true, path: '/sell_energy', title: 'Sell Energy', type: 'sell_energy' }
            ]
        });
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Transactions: {
                recentTransactions: {
                    data: 'tx_data',
                    error: null,
                    loading: false
                }
            },
            Users: {
                profile: {
                    data: { user: 'user_data' },
                    error: 'test_error',
                    loading: 'test_loading'
                }
            }
        };
        const props = Overview.mapStateToProps(stateDummy);
        expect(props).toEqual({
            recentTransactions: 'tx_data',
            user: 'user_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it("should show alert if user's contract has waiting status", () => {
        const propsWithPendingContractStatus = {
            ...props,
            user: { ...props.user, contract: { statusCode: CONTRACT_STATUSES.waiting } }
        };
        const component = shallowWithIntl(<Overview {...propsWithPendingContractStatus} />, context);

        expect(component.find('Alert')).toHaveLength(1);
        expect(component.find('Alert').props().children).toBe(
            'Your contract with Nordic Energy was successfull, now we are waiting until the switch from your previous supplier is completed. Further details are available in the "Documents" section. After the switch, Lition is supplying you with Energy and you can choose a producer of your choice.'
        );
        expect(component.find('EmptyRecentTransactions')).toHaveLength(1);
    });

    it("should show alert if user's contract has not active status", () => {
        const propsWithPendingContractStatus = {
            ...props,
            user: { ...props.user, contract: { statusCode: 3001, statusCodeTitle: 'success' } }
        };
        const component = shallowWithIntl(<Overview {...propsWithPendingContractStatus} />, context);

        expect(component.find('Alert')).toHaveLength(1);
        expect(component.find('Alert').props().children).toBe(
            'You are currently not supplied by Nordic Energy (Start of delivery sent). Feel free to contact us if you need more detail.'
        );
        expect(component.find('EmptyRecentTransactions')).toHaveLength(1);
    });

    it('should provide possibility navigate to show transactions page', () => {
        const component = renderComponent();
        component.setContext(context);

        component
            .find(RecentTransactions)
            .at(0)
            .props()
            .onButtonClick();

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/show_transactions');
    });

    it('should provide possibility navigate to different routes through cards', () => {
        const component = renderComponent();
        component.setContext(context);

        const cards = component.find(NavigationCardsPanel).at(0);
        cards.props().onCardClick('/testRoute');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/testRoute');
    });

    it('should perform related actions on did mount step', () => {
        renderContainer();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(1);

        const component = renderComponent();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(2);
        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(0);
        expect(setInterval).toHaveBeenCalledTimes(0);
        expect(clearInterval).toHaveBeenCalledTimes(0);

        component.setProps({ user: { id: 10, contract: { statusCode: 3000 } } });

        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(1);
        const [[userId]] = txActions.performGetRecentTransactions.mock.calls;
        expect(userId).toEqual(10);

        component.setProps({ user: { id: 11, contract: { statusCode: 3000 } } });
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(clearInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000 * 60);

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({
            message:
                "Can't load transactions data from Nordic Energy web server. Please contact administrator to resolve the error.",
            type: 'error'
        });
    });

    it('should clear interval functions on unmount step', () => {
        const component = renderComponent();
        expect(clearInterval).toHaveBeenCalledTimes(0);
        component.setProps({ user: { id: 10, contract: { statusCode: 3000 } } });
        component.unmount();
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const overview = renderComponent();

        overview.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        overview.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });
});
