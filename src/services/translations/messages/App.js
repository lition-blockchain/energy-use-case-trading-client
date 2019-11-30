import { defineMessages } from 'react-intl';

const messages = defineMessages({
    overview: {
        id: 'app.menuBar.overview',
        defaultMessage: 'Overview'
    },
    documents: {
        id: 'app.menuBar.documents',
        defaultMessage: 'My Documents'
    },
    submitMeter: {
        id: 'app.menuBar.submitMeter',
        defaultMessage: 'Submit Meter Readings'
    },
    trading: {
        id: 'app.menuBar.trading',
        defaultMessage: 'Trading'
    },
    buyEnergy: {
        id: 'app.menuBar.buyEnergy',
        defaultMessage: 'Buy energy'
    },
    directTrading: {
        id: 'app.menuBar.directTrading',
        defaultMessage: 'Direct Trading'
    },
    profile: {
        id: 'app.menuBar.profile',
        defaultMessage: 'Profile'
    },
    about: {
        id: 'app.footer.about',
        defaultMessage: 'About Us'
    },
    termsAndConditions: {
        id: 'app.footer.termsAndConditions',
        defaultMessage: 'Terms & Conditions'
    },
    faq: {
        id: 'app.footer.faq',
        defaultMessage: 'FAQ'
    },
    address: {
        id: 'app.footer.address',
        defaultMessage: '2019. Nordic Energy. All rights reserved.'
    },
    logoutConfirm: {
        id: 'app.header.logoutConfirm',
        defaultMessage: "Are you sure that you'd like to logout from the system?"
    },
    logoutLabel: {
        id: 'app.header.logoutLabel',
        defaultMessage: 'Logout'
    },
    contractLabel: {
        id: 'app.header.contractLabel',
        defaultMessage: 'Contract'
    },
    noContractsMessage: {
        id: 'app.header.noContractsMessage',
        defaultMessage: 'No contracts'
    },
    menuBarLabel: {
        id: 'app.header.menuBarLabel',
        defaultMessage: 'Toggle menu sidebar'
    },
    configSideBarLabel: {
        id: 'app.header.configSideBarLabel',
        defaultMessage: 'Toggle config sidebar'
    },
    contractMessage: {
        id: 'app.contractModal.contractMessage',
        defaultMessage: 'To continue, please select a contract.'
    },
    noContractMessage: {
        id: 'app.contractModal.noContractMessage',
        defaultMessage:
            'At present, no contract data can be displayed. Please contact the administrator or try again later.'
    },
    selectContractMessage: {
        id: 'app.contractModal.selectContractMessage',
        defaultMessage: 'Select contract'
    },
    selectLocaleMessage: {
        id: 'app.header.selectLocaleMessage',
        defaultMessage: 'Select Locale'
    },
    logoutConfirmMessage: {
        id: 'app.header.logoutConfirmMessage',
        defaultMessage: "Are you sure that you'd like to logout from the system?"
    },
    logoutConfirmButton: {
        id: 'app.header.logoutConfirmButton',
        defaultMessage: 'Yes'
    },
    logoutCancelButton: {
        id: 'app.header.logoutCancelButton',
        defaultMessage: 'No'
    },
    defaultErrorMessage: {
        id: 'app.notifications.defaultErrorMessage',
        defaultMessage: 'Internal web server error. Please try to refresh page later or contact administrator.'
    },
    loadingContractsErrorMessage: {
        id: 'app.notifications.loadingContractsErrorMessage',
        defaultMessage:
            'An error occurred while getting contracts data. Please try to refresh page later or contact administrator.'
    },
    setContractErrorMessage: {
        id: 'app.notifications.setContractErrorMessage',
        defaultMessage:
            'An error occurred while selecting contract. Please try select contract later or contact administrator.'
    }
});

export default messages;
