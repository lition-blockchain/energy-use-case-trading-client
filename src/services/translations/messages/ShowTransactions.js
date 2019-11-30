import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.showTransactionsPage.header',
        defaultMessage: 'Show Transactions'
    },
    sellCoinsButton: {
        id: 'app.showTransactionsPage.sellCoinsButton',
        defaultMessage: 'Sell Coins'
    },
    buyCoinsButton: {
        id: 'app.showTransactionsPage.buyCoinsButton',
        defaultMessage: 'Buy Coins'
    },
    recentTransactionsTitle: {
        id: 'app.recentTransactions.title',
        defaultMessage: 'Most Recent Transactions'
    },
    recentTransactionsHeaderDate: {
        id: 'app.recentTransactions.headerDate',
        defaultMessage: 'Date'
    },
    recentTransactionsHeaderTransaction: {
        id: 'app.recentTransactions.headerTransaction',
        defaultMessage: 'Transactions'
    },
    recentTransactionsHeaderAmount: {
        id: 'app.recentTransactions.headerAmount',
        defaultMessage: 'Amount'
    },
    recentTransactionsMonthlyBalance: {
        id: 'app.recentTransactions.monthlyBalance',
        defaultMessage: 'Monthly Balance'
    },
    recentTransactionsMore: {
        id: 'app.recentTransactions.more',
        defaultMessage: 'More'
    },
    recentTransactionsDetailsFrom: {
        id: 'app.recentTransactionsDetails.from',
        defaultMessage: 'From'
    },
    recentTransactionsDetailsAmount: {
        id: 'app.recentTransactionsDetails.amount',
        defaultMessage: 'Amount'
    },
    recentTransactionsDetailsPrice: {
        id: 'app.recentTransactionsDetails.price',
        defaultMessage: 'Price per kWh'
    },
    recentTransactionsDetailsHash: {
        id: 'app.recentTransactionsDetails.hash',
        defaultMessage: 'Blockchain-Transaction'
    },
    recentTransactionsDetailsStatus: {
        id: 'app.recentTransactionsDetails.status',
        defineMessages: 'Status'
    },
    recentTransactionsDescriptionFrom: {
        id: 'app.recentTransactionsDescription.from',
        defaultMessage: 'from'
    },
    recentTransactionsDescriptionBought: {
        id: 'app.recentTransactionsDescription.bought',
        defaultMessage: 'Bought'
    },
    loadingErrorMessage: {
        id: 'app.recentTransactions.loadingErrorMessage',
        defaultMessage:
            "Can't load transactions data from Nordic Energy web server. Please contact administrator to resolve the error."
    }
});

export default messages;
