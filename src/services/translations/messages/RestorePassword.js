import { defineMessages } from 'react-intl';

const messages = defineMessages({
    formTitle: {
        id: 'app.restorePasswordPage.formTitle',
        defaultMessage: 'Restore password'
    },
    emailField: {
        id: 'app.restorePasswordPage.emailField',
        defaultMessage: 'Enter Your Email'
    },
    sendButton: {
        id: 'app.restorePasswordPage.sendButton',
        defaultMessage: 'Send'
    },
    loginLink: {
        id: 'app.restorePasswordPage.loginLink',
        defaultMessage: 'Login'
    },
    emptyEmailError: {
        id: 'app.restorePasswordPage.errors.emptyEmail',
        defaultMessage: 'Enter Your Email.'
    },
    invalidEmailError: {
        id: 'app.restorePasswordPage.errors.invalidEmail',
        defaultMessage: 'Invalid email.'
    },
    tokenWasCreated: {
        id: 'app.restorePasswordPage.info.tokenWasCreated',
        defaultMessage: 'An email will be sent to you with a link to reset your password'
    },
    createErrorMessage: {
        id: 'app.restorePasswordPage.errors.createErrorMessage',
        defaultMessage:
            'An error occurred while creating reset password token. Please contact administrator to resolve the error.'
    }
});

export default messages;
