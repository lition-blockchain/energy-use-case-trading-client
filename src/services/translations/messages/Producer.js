import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.producerPage.header',
        defaultMessage: 'My Producer'
    },
    name: {
        id: 'app.producerPage.name',
        defaultMessage: 'Name'
    },
    price: {
        id: 'app.producerPage.price',
        defaultMessage: 'Price'
    },
    marketPrice: {
        id: 'app.producerPage.marketPrice',
        defaultMessage: 'vs. market price of'
    },
    energyType: {
        id: 'app.producerPage.energyType',
        defaultMessage: 'Type of energy'
    },
    annualProduction: {
        id: 'app.producerPage.annualProduction',
        defaultMessage: 'Annual Production'
    },
    purchased: {
        id: 'app.producerPage.purchased',
        defaultMessage: 'Energy purchased'
    },
    capacity: {
        id: 'app.producerPage.capacity',
        defaultMessage: 'Peak Capacity'
    },
    selectedSince: {
        id: 'app.producerPage.selectedSince',
        defaultMessage: 'Selected since'
    },
    ethereumAddress: {
        id: 'app.producerPage.ethereumAddress',
        defaultMessage: 'Ethereum Address'
    },
    location: {
        id: 'app.producerPage.location',
        defaultMessage: 'Location'
    },
    selectButton: {
        id: 'app.producerPage.selectButton',
        defaultMessage: 'Select producer'
    },
    producerSoldOutHelpText: {
        id: 'app.producerPage.soldOutHelpText',
        defaultMessage: `You can't select producers with "sold out" status`
    },
    showButton: {
        id: 'app.producerPage.showButton',
        defaultMessage: 'Show producers'
    },
    switchBack: {
        id: 'app.producerPage.switchBack',
        defaultMessage: 'Switch back to Nordic Energy Powerplant'
    },
    loadingErrorMessage: {
        id: 'app.producerPage.errors.loadingErrorMessage',
        defaultMessage:
            "Can't load producer data from Nordic Energy web server. Please contact administrator to resolve the error."
    },
    selectErrorMessage: {
        id: 'app.producerPage.errors.selectErrorMessage',
        defaultMessage:
            'An error occurred while selecting the producer. Please contact administrator to resolve the error.'
    },
    selectMessage: {
        id: 'app.producerPage.notifications.selectMessage',
        defaultMessage:
            'Producer is selected. We successfully stored your transaction. It can take a few minutes until the transaction is listed in your transaction history.'
    }
});

export default messages;
