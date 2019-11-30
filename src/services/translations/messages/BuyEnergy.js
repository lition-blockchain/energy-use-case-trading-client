import { defineMessages } from 'react-intl';

const messages = defineMessages({
    pageTitle: {
        id: 'app.buyEnergyPage.pageTitle',
        defaultMessage: 'Buy Energy'
    },
    selectedProducerLabel: {
        id: 'app.buyEnergyPage.selectedProducerLabel',
        defaultMessage: 'Current Selection:'
    },
    filterLabel: {
        id: 'app.buyEnergyPage.filterLabel',
        defaultMessage: 'Filter by'
    },
    filterOptionAll: {
        id: 'app.buyEnergyPage.filterOptionAll',
        defaultMessage: 'All'
    },
    tradeDirectlyOnMarketLink: {
        id: 'app.buyEnergyPage.tradeDirectlyOnMarketLink',
        defaultMessage: 'Trade directly on market'
    },
    nordicenergyEnergyExchangeLink: {
        id: 'app.buyEnergyPage.nordicEnergyExchangeLink',
        defaultMessage: 'Nordic Energy energy exchange'
    },
    loadingErrorMessage: {
        id: 'app.buyEnergyPage.loadingErrorMessage',
        defaultMessage:
            "Can't load producers data from Nordic Energy web server. Please contact administrator to resolve the error."
    }
});

export default messages;
