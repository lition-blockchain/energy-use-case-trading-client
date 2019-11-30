import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.documentsPage.header',
        defaultMessage: 'My Documents'
    },
    noDocumentsMessage: {
        id: 'app.documentsPage.noDocumentsMessage',
        defaultMessage: 'You have no documents.'
    },
    loadingErrorMessage: {
        id: 'app.documentsPage.errors.loadingErrorMessage',
        defaultMessage:
            "Can't load documents from Nordic Energy web server. Please contact administrator to resolve the error."
    }
});

export default messages;
