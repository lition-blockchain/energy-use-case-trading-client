import { defineMessages } from 'react-intl';

const messages = defineMessages({
    contractWaitingStatusCode: {
        id: 'app.overviewPage.contractWaitingStatusCode',
        defaultMessage:
            'Your contract with Nordic Energy was successfull, now we are waiting until the switch from your previous supplier is completed. Further details are available in the "Documents" section. After the switch, Nordic Energy is supplying you with Energy and you can choose a producer of your choice.'
    },
    contractOthersStatusCodes: {
        id: 'app.overviewPage.contractOthersStatusCodes',
        defaultMessage:
            'You are currently not supplied by Nordic Energy ({statusCodeTitle}). Feel free to contact us if you need more detail.'
    },
    myProducer: {
        id: 'app.navigationCardsPanel.myProducer',
        defaultMessage: 'My Producer'
    },
    sellEnergy: {
        id: 'app.navigationCardsPanel.sellEnergy',
        defaultMessage: 'Sell Energy'
    },
    buyEnergy: {
        id: 'app.navigationCardsPanel.buyEnergy',
        defaultMessage: 'Buy Energy'
    },
    recentTransactionsTitle: {
        id: 'app.recentTransactions.title',
        defaultMessage: 'Most Recent Transactions'
    },
    recentTransactionsEmptyMessage: {
        id: 'app.recentTransactions.emptyMessage',
        defaultMessage: 'No transaction information'
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
