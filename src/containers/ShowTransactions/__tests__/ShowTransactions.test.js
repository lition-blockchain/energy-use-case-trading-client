import React from 'react';
import { faHome } from '@fortawesome/fontawesome-free-solid';
import { Provider } from 'react-redux';
import ShowTransactionsContainer, { ShowTransactions } from '../ShowTransactions';
import { BackLink, RecentTransactions } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import { formatFloat } from '../../../services/formatter';
import configureMockStore from 'redux-mock-store';

import * as usersActions from '../../../action_performers/users';
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

const mockStore = configureMockStore();
const store = mockStore({
    Users: {
        profile: {
            data: {
                user: {
                    id: 1
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
                hasNextTransactions: 3,
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
    },
    App: {
        localization: {
            data: {
                locale: 'en'
            }
        }
    }
});

const props = {
    recentTransactions: {
        currentBalance: {
            date: 1523707200,
            balance: 40.4
        },
        hasNextTransactions: 3,
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
    locale: 'en',
    user: { id: 'testId' },
    loading: false,
    error: null
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <ShowTransactionsContainer context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<ShowTransactions {...props} context={context} />);
}

describe('<ShowTransactions /> Component', () => {
    jest.useFakeTimers();

    const mainContainerMock = document.createElement('div');

    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        usersActions.performGetUserData = jest.fn();
        txActions.performGetRecentTransactions = jest.fn();
        notificationActions.performPushNotification = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        appActions.performSetupBreadcrumbs = jest.fn();

        jest.spyOn(document, 'getElementById').mockReturnValue(mainContainerMock);
        jest.spyOn(mainContainerMock, 'addEventListener');
        jest.spyOn(mainContainerMock, 'removeEventListener');
    });

    it(`should contains following controls:
        - 1 <RecentTransactions /> component;
        - 2 <section> elements;
        - 1 <h1> element;`, () => {
        const component = renderContainer();

        expect(component.find('section.show-transaction-page')).toHaveLength(1);
        expect(component.find('section')).toHaveLength(2);
        expect(component.find(RecentTransactions)).toHaveLength(1);
        expect(component.find(BackLink)).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
    });

    it('should handler scroll event', () => {
        const component = renderComponent();
        const handleScrollMock = component.instance().scrollHandler;

        expect(mainContainerMock.addEventListener).toHaveBeenCalledWith('scroll', component.instance().scrollHandler);

        component.unmount();
        expect(mainContainerMock.removeEventListener).toHaveBeenCalledWith('scroll', handleScrollMock);
    });

    it('should provide possibility back to overview page through header', () => {
        const event = { preventDefault: jest.fn() };
        const component = renderComponent();
        component.setContext(context);
        const backLink = component.find(BackLink).at(0);
        backLink.simulate('click', event);

        expect(context.router.history.push).toHaveBeenCalledWith('/');
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call prepare common function', () => {
        const component = renderContainer();
        const table = component.find(RecentTransactions).at(0);
        const tableProps = table.props();
        delete tableProps.onButtonClick;
        expect(tableProps).toEqual({
            currentBalance: { ...props.recentTransactions.currentBalance },
            labels: {
                buyCoinsButton: 'Buy Coins',
                header: 'Show Transactions',
                recentTransactionsDetailsAmount: 'Amount',
                recentTransactionsDetailsFrom: 'From',
                recentTransactionsDetailsHash: 'Blockchain Transaction',
                recentTransactionsDetailsPrice: 'Price per kWh',
                recentTransactionsDetailsStatus: 'Status',
                recentTransactionsHeaderAmount: 'Amount',
                recentTransactionsHeaderDate: 'Date',
                recentTransactionsHeaderTransaction: 'Transaction',
                recentTransactionsMonthlyBalance: 'Monthly Balance',
                recentTransactionsMore: 'More',
                recentTransactionsTitle: 'Most Recent Transactions',
                recentTransactionsDescriptionBought: 'Bought',
                recentTransactionsDescriptionFrom: 'from',
                sellCoinsButton: 'Sell Coins',
                loadingErrorMessage:
                    "Can't load transactions data from Nordic Energy web server. Please contact administrator to resolve the error."
            },
            loading: false,
            pagination: true,
            transactions: [
                ...props.recentTransactions.transactions.map(tx => ({
                    ...tx,
                    details: { ...tx.details, status: 'Success' }
                }))
            ]
        });
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Transactions: {
                recentTransactions: {
                    data: {
                        numberOfTransactions: 20,
                        transactions: ['tx_test']
                    },
                    error: null,
                    loading: 'tx_loading'
                }
            },
            Users: {
                profile: {
                    data: { user: 'user_data' },
                    error: 'test_error',
                    loading: 'test_loading'
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
        const props = ShowTransactions.mapStateToProps(stateDummy);
        expect(props).toEqual({
            locale: 'en',
            recentTransactions: {
                numberOfTransactions: 20,
                transactions: ['tx_test']
            },
            hasNextTransactions: true,
            transactionsLoading: 'tx_loading',
            user: 'user_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it('should perform related actions on did mount step', () => {
        renderContainer();

        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(2);
        const [, [bArg1]] = appActions.performSetupBreadcrumbs.mock.calls;
        expect(bArg1).toEqual([
            { icon: faHome, id: '', label: 'Overview', path: '/' },
            { id: 'show_transactions', label: 'Show Transactions', path: '/show_transactions' }
        ]);

        expect(usersActions.performGetUserData.mock.calls.length).toEqual(1);

        const component = renderComponent();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(2);
        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(0);

        component.setProps({ user: { id: 10 } });
        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(1);
        const [[userId]] = txActions.performGetRecentTransactions.mock.calls;
        expect(userId).toEqual(10);

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({
            message:
                "Can't load transactions data from Nordic energy web server. Please contact administrator to resolve the error.",
            type: 'error'
        });
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const showTransactions = renderComponent();

        showTransactions.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        showTransactions.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should call scroll handler of the container', () => {
        const showTransactions = renderComponent();
        const dummyEvent = {
            target: {
                scrollTop: 10,
                clientHeight: 10,
                scrollHeight: 10
            }
        };
        showTransactions.setProps({
            hasNextTransactions: true,
            transactionsLoading: false
        });
        showTransactions.instance().scrollHandler(dummyEvent);
        jest.runAllTimers();
        expect(showTransactions.state('page')).toBe(1);
    });

    it('should setup translated breadcrumbs when locale changed', () => {
        const showTransactions = renderComponent();

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(2);

        showTransactions.setProps({
            locale: 'de'
        });

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(3);
    });
});
