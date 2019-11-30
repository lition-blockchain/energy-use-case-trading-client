import { defineMessages } from 'react-intl';

const messages = defineMessages({
    pageTitle: {
        id: 'app.directTrading.pageTitle',
        defaultMessage: 'Advanced Trading'
    },
    pageSubTitle: {
        id: 'app.directTrading.pageSubTitle',
        defaultMessage: 'Advanced trading energy trader access to blockchain'
    },
    metaMaskMessageStart: {
        id: 'app.directTrading.metaMask.messageStart',
        defaultMessage: 'Please use a'
    },
    metaMaskMessageTail: {
        id: 'app.directTrading.metaMask.messageTail',
        defaultMessage: 'browser plugin to allow direct energy trading from your client!'
    },
    metaMaskLinksLabel: {
        id: 'app.directTrading.metaMask.linksLabel',
        defaultMessage: 'MetaMask for '
    },
    metaMaskConfigurationFormTitle: {
        id: 'app.directTrading.metaMask.configurationForm.title',
        defaultMessage: 'Configuration'
    },
    metaMaskConfigurationFormBlockChainField: {
        id: 'app.directTrading.metaMask.configurationForm.blockChainField',
        defaultMessage: 'Blockchain'
    },
    metaMaskConfigurationFormAddressField: {
        id: 'app.directTrading.metaMask.configurationForm.addressField',
        defaultMessage: 'Contract Address'
    },
    metaMaskConfigurationFormAddressPlaceholder: {
        id: 'app.directTrading.metaMask.configurationForm.addressPlaceholder',
        defaultMessage: 'Select contract address'
    },
    metaMaskConfigurationFormButton: {
        id: 'app.directTrading.metaMask.configurationForm.button',
        defaultMessage: 'Add Contract Address'
    },
    metaMaskConfigurationFormHelperText: {
        id: 'app.directTrading.metaMask.configurationForm.helperText',
        defaultMessage: 'Assign contract address to your Nordic Energy account'
    },
    metaMaskTradePositionsTitle: {
        id: 'app.directTrading.metaMask.tradePositions.title',
        defaultMessage: 'Open Trade Positions'
    },
    metaMaskTradePositionsTradeVolumeField: {
        id: 'app.directTrading.metaMask.tradePositions.tradeVolumeField',
        defaultMessage: 'Trade Volume'
    },
    metaMaskTradePositionsFilterByDateField: {
        id: 'app.directTrading.metaMask.tradePositions.filterByDateField',
        defaultMessage: 'Filter by Date'
    },
    metaMaskTradePositionsDateHelperText: {
        id: 'app.directTrading.metaMask.tradePositions.dateHelperText',
        defaultMessage: 'Editing format dd.mm.yyyy'
    },
    metaMaskTradePositionsSortToolbarTitle: {
        id: 'app.directTrading.metaMask.tradePositions.sortToolbarTitle',
        defaultMessage: 'Sort by'
    },
    metaMaskErrorsBlockChain: {
        id: 'app.directTrading.metaMask.errors.blockChain',
        defaultMessage: 'Select blockchain network.'
    },
    metaMaskErrorsAddress: {
        id: 'app.directTrading.metaMask.errors.address',
        defaultMessage: 'Select one of address.'
    },
    confirmationTransactionDialogMessage: {
        id: 'app.directTrading.confirmationDialog.successMessage',
        defaultMessage: 'Transaction is pending. Transaction hash is'
    },
    confirmationStatusDialogMessage: {
        id: 'app.directTrading.confirmationDialog.statusInfoMessage',
        defaultMessage:
            'User ledger address registration is in progress. Next step will be available after registration will be succeed.'
    },
    wrongNetworkNotificationMessage: {
        id: 'app.directTrading.wrongNetworkNotificationMessage',
        defaultMessage: 'Wrong ledger network is chosen'
    },
    loadingErrorMessage: {
        id: 'app.directTrading.errors.loadingErrorMessage',
        defaultMessage:
            "Can't load transactions or ledger network data from Nordic Energy web server. Please contact administrator to resolve the error."
    },
    performTxErrorMessage: {
        id: 'app.directTrading.errors.performTxErrorMessage',
        defaultMessage:
            'An error occurred while performing the transaction. Please contact administrator to resolve the error.'
    }
});

export default messages;
