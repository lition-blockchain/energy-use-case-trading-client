import { defineMessages } from 'react-intl';

const messages = defineMessages({
    header: {
        id: 'app.profilePage.header',
        defaultMessage: 'Profile'
    },
    personalDataTab: {
        id: 'app.profilePage.labels.personalDataTab',
        defineMessage: 'Customer Data'
    },
    paymentDataTab: {
        id: 'app.profilePage.labels.paymentDataTab',
        defineMessage: 'Payment'
    },
    submitButton: {
        id: 'app.profilePage.labels.submitButton',
        defaultMessage: 'Save'
    },
    firstName: {
        id: 'app.profilePage.labels.firstName',
        defaultMessage: 'First name'
    },
    lastName: {
        id: 'app.profilePage.labels.lastName',
        defaultMessage: 'Last name'
    },
    birthday: {
        id: 'app.profilePage.labels.birthday',
        defaultMessage: 'Date of birth'
    },
    birthdayHelperText: {
        id: 'app.profilePage.labels.birthdayHelperText',
        defaultMessage: 'Editing format dd.mm.yyyy'
    },
    IBAN: {
        id: 'app.profilePage.labels.iban',
        defaultMessage: 'Bank account number'
    },
    email: {
        id: 'app.profilePage.labels.email',
        defaultMessage: 'Email'
    },
    street: {
        id: 'app.profilePage.labels.street',
        defaultMessage: 'Street'
    },
    streetNumber: {
        id: 'app.profilePage.labels.streetNumber',
        defaultMessage: 'Street Number'
    },
    postcode: {
        id: 'app.profilePage.labels.postcode',
        defaultMessage: 'Postcode'
    },
    city: {
        id: 'app.profilePage.labels.city',
        defaultMessage: 'City'
    },
    oldPassword: {
        id: 'app.profilePage.labels.oldPassword',
        defaultMessage: 'Current password'
    },
    newPassword: {
        id: 'app.profilePage.labels.newPassword',
        defaultMessage: 'New password'
    },
    confirmNewPassword: {
        id: 'app.profilePage.labels.confirmNewPassword',
        defaultMessage: 'Repeat new password'
    },
    contractContractNumber: {
        id: 'app.profilePage.labels.contract.contractNumber',
        defaultMessage: 'Contract Number'
    },
    contractStartDate: {
        id: 'app.profilePage.labels.contract.startDate',
        defaultMessage: 'Start Date'
    },
    contractEndDate: {
        id: 'app.profilePage.labels.contract.endDate',
        defaultMessage: 'End Date'
    },
    contractFirstName: {
        id: 'app.profilePage.labels.contract.firstName',
        defaultMessage: 'First Name'
    },
    contractLastName: {
        id: 'app.profilePage.labels.contract.lastName',
        defaultMessage: 'Last Name'
    },
    contractStreet: {
        id: 'app.profilePage.labels.contract.street',
        defaultMessage: 'Street'
    },
    contractHouseNumber: {
        id: 'app.profilePage.labels.contract.houseNumber',
        defaultMessage: 'House Number'
    },
    contractPostcode: {
        id: 'app.profilePage.labels.contract.postcode',
        defaultMessage: 'Postcode'
    },
    contractCity: {
        id: 'app.profilePage.labels.contract.city',
        defaultMessage: 'City'
    },
    paymentMethod: {
        id: 'app.profilePage.labels.paymentMethod',
        defaultMessage: 'Payment options'
    },
    paymentMethodDebitOption: {
        id: 'app.profilePage.labels.paymentMethodDebitOption',
        defaultMessage: 'Debit'
    },
    paymentMethodTransferOption: {
        id: 'app.profilePage.labels.paymentMethodTransferOption',
        defaultMessage: 'Transfer'
    },
    paymentMethodBitcoinOption: {
        id: 'app.profilePage.labels.paymentMethodBitcoinOption',
        defaultMessage: 'Bitcoin'
    },
    sepaApproval: {
        id: 'app.profilePage.labels.sepaApproval',
        defaultMessage: 'Issuing SEPA-Mandate'
    },
    sepaApprovalOption: {
        id: 'app.profilePage.labels.sepaApprovalOption',
        defaultMessage: 'I agree to terms'
    },
    sepaApprovalHelp: {
        id: 'app.profilePage.labels.sepaApprovalHelp',
        defaultMessage:
            'The named account holder authorizes the Nordic Energy. Ltd to collect payments from his account by direct debit. At the same time, said account holder instructs its credit institution to redeem the direct debits drawn by the supplier into its account. Note: Within eight weeks, starting with the debit date, the reimbursement of the debited amount can be reclaimed. The conditions agreed with the bank apply.'
    },
    bitcoinMessage: {
        id: 'app.profilePage.labels.bitcoinMessage',
        defaultMessage:
            'Nordic Energy accepts your Monthly payments in Bitcoin. Whenever your monthly installment is due, we will send you a link with instructions how to pay your Energy in Bitcoin or Bitcoin Cash, using the then current Bitcoin-Euro Exchange rate.'
    },
    sepaApprovalValidator: {
        id: 'app.profilePage.errors.sepaApprovalValidator',
        defaultMessage: 'Please accept the SEPA terms.'
    },
    emptyFirstName: {
        id: 'app.profilePage.errors.firstName',
        defaultMessage: 'Enter your first name.'
    },
    emptyLastName: {
        id: 'app.profilePage.errors.lastName',
        defaultMessage: 'Enter your last name.'
    },
    emptyIban: {
        id: 'app.profilePage.errors.iban',
        defaultMessage: 'Enter your IBAN.'
    },
    invalidIban: {
        id: 'app.profilePage.errors.invalidIban',
        defaultMessage: 'Enter valid IBAN.'
    },
    emptyStreet: {
        id: 'app.profilePage.errors.street',
        defaultMessage: 'Enter your street.'
    },
    emptyStreetNumber: {
        id: 'app.profilePage.errors.streetNumber',
        defaultMessage: 'Enter your street number.'
    },
    emptyPostcode: {
        id: 'app.profilePage.errors.postcode',
        defaultMessage: 'Enter your postcode.'
    },
    emptyCity: {
        id: 'app.profilePage.errors.city',
        defaultMessage: 'Enter your city.'
    },
    emptyEmail: {
        id: 'app.profilePage.errors.emptyEmail',
        defaultMessage: 'Enter your email.'
    },
    passwordsMismatch: {
        id: 'app.profilePage.errors.passwordsMismatch',
        defaultMessage: "Passwords don't match."
    },
    emptyPassword: {
        id: 'app.profilePage.errors.emptyPassword',
        defaultMessage: 'Enter new password.'
    },
    emptyOldPassword: {
        id: 'app.profilePage.errors.emptyOldPassword',
        defaultMessage: 'Enter old password.'
    },
    emptyPasswordForEmailUpdating: {
        id: 'app.profilePage.errors.emptyPasswordForEmailUpdating',
        defaultMessage: 'Enter your current password to update email.'
    },
    emptyConfirmPassowrd: {
        id: 'app.profilePage.errors.emptyConfirmPassowrd',
        defaultMessage: 'Repeat your password.'
    },
    invalidEmail: {
        id: 'app.profilePage.errors.invalidEmail',
        defaultMessage: 'Invalid email address.'
    },
    profileUpdatedMessage: {
        id: 'app.profilePage.notifications.profileUpdated',
        defineMessages: 'Profile successfully updated'
    },
    profileUpdatedErrorMessage: {
        id: 'app.profilePage.errors.profileUpdatedErrorMessage',
        defineMessages: 'An error occurred while updating profile data'
    },
    profileLoadingErrorMessage: {
        id: 'app.profilePage.errors.profileLoadingErrorMessage',
        defineMessages:
            "Can't load profile data from Nordic Energy web server. Please contact administrator to resolve the error."
    }
});

export default messages;
