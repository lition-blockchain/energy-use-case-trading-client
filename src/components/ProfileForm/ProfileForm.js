import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import pick from 'lodash.pick';
import { KEYBOARD_KEY_VALUES, PAYMENT_METHODS } from '../../constants';
import { Button, Checkbox, DateField, IBANField, RadioButton, TextField } from '../index';
import './ProfileForm.css';

class ProfileForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.tabs = ['personalData', 'paymentData'];
        this.state = {
            dirty: false,
            selectedTabIndex: 0,
            formData: this.getFormData(props.profile)
        };
    }

    getFormData(profile) {
        return {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            ...ProfileForm.defaultProps.profile,
            ...pick(profile, Object.keys(ProfileForm.defaultProps.profile)),
            contract: {
                ...profile.contract,
                paymentMethod:
                    profile.contract.paymentMethod === PAYMENT_METHODS.bitcoin
                        ? PAYMENT_METHODS.bitcoin
                        : profile.contract.IBAN ? PAYMENT_METHODS.debit : PAYMENT_METHODS.transfer
            },
            sepaApproval: Boolean(profile.contract.IBAN)
        };
    }

    componentDidUpdate(prevProps) {
        const { profile } = this.props;

        if (profile !== prevProps.profile) {
            this.setState({ dirty: false, formData: this.getFormData(profile) });
        }
    }

    toggleTab(tabIndex) {
        this.setState({ selectedTabIndex: tabIndex });
    }

    handleTabKeyDown(event) {
        const selectedTabIndex = this.state.selectedTabIndex;
        const firstIndex = 0;
        const lastIndex = this.tabs.length - 1;

        switch (event.key) {
            case KEYBOARD_KEY_VALUES.ARROW_LEFT:
                this.setState({ selectedTabIndex: selectedTabIndex > firstIndex ? selectedTabIndex - 1 : lastIndex });
                break;
            case KEYBOARD_KEY_VALUES.ARROW_RIGHT:
                this.setState({ selectedTabIndex: selectedTabIndex < lastIndex ? selectedTabIndex + 1 : firstIndex });
                break;
            case KEYBOARD_KEY_VALUES.HOME:
                event.preventDefault();
                this.setState({ selectedTabIndex: firstIndex });
                break;
            case KEYBOARD_KEY_VALUES.END:
                event.preventDefault();
                this.setState({ selectedTabIndex: lastIndex });
                break;
            default:
                break;
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            dirty: true,
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    handleDateFieldChange({ name, value }) {
        this.setState({
            dirty: true,
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    handlePaymentMethodChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const formData = this.state.formData;

        this.setState({
            dirty: true,
            formData: {
                ...formData,
                contract: {
                    ...formData.contract,
                    IBAN: '',
                    [name]: value
                },
                sepaApproval: false
            }
        });
    }

    handleSubmit() {
        this.props.onSubmit(this.state.formData);
    }

    personalDataTabHasErrors() {
        const { errors } = this.props;
        return !!Object.keys(errors)
            .filter(key => key !== 'contract.IBAN' && key !== 'sepaApproval')
            .map(key => errors[key])
            .filter(error => !!error).length;
    }

    paymentDataTabHasErrors() {
        const { errors } = this.props;
        return !!errors.IBAN || !!errors.sepaApproval;
    }

    renderTabErrorFeedback(id, show) {
        const classes = classNames(
            'profile-form-tab-errors-feedback',
            !show && 'profile-form-tab-errors-feedback--hide'
        );
        return (
            <span id={id} className={classes} aria-label="Tab has errors" aria-live="polite">
                <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
        );
    }

    render() {
        const { locale, labels, errors } = this.props;
        const { formData } = this.state;
        const selectedTab = this.tabs[this.state.selectedTabIndex];
        const isPersonalDataTabHasErrors = this.personalDataTabHasErrors();
        const isPaymentDataTabHasErrors = this.paymentDataTabHasErrors();

        return (
            <div className="profile-form">
                <div className="profile-form-tab-list" role="tablist">
                    <button
                        id="personalDataTab"
                        role="tab"
                        aria-selected={selectedTab === 'personalData'}
                        aria-controls="personalDataTabPanel"
                        aria-describedby="personalDataTabErrors"
                        onKeyDown={event => this.handleTabKeyDown(event)}
                        onClick={() => this.toggleTab(0)}
                    >
                        {labels.personalDataTab}
                        {this.renderTabErrorFeedback('personalDataTabErrors', isPersonalDataTabHasErrors)}
                    </button>
                    <button
                        id="paymentDataTab"
                        role="tab"
                        aria-selected={selectedTab === 'paymentData'}
                        aria-controls="paymentDataTabPanel"
                        aria-describedby="paymentDataTabErrors"
                        onKeyDown={event => this.handleTabKeyDown(event)}
                        onClick={() => this.toggleTab(1)}
                    >
                        {labels.paymentDataTab}
                        {this.renderTabErrorFeedback('paymentDataTabErrors', isPaymentDataTabHasErrors)}
                    </button>
                </div>
                <div
                    id="personalDataTabPanel"
                    className="profile-form-tab-panel"
                    hidden={selectedTab !== 'personalData'}
                    role="tabpanel"
                    tabIndex={-1}
                    aria-labelledby="personalDataTab"
                >
                    <TextField
                        disabled
                        label={labels.firstName}
                        name="firstName"
                        value={formData.firstName}
                        error={errors.firstName}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.lastName}
                        name="lastName"
                        value={formData.lastName}
                        error={errors.lastName}
                        onChange={e => this.handleChange(e)}
                    />
                    <DateField
                        disabled
                        locale={locale}
                        name="birthday"
                        helperText={labels.birthdayHelperText}
                        label={labels.birthday}
                        value={formData.birthday}
                        error={errors.birthday}
                        onChange={e => this.handleDateFieldChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.city}
                        name="city"
                        value={formData.city}
                        error={errors.city}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.street}
                        name="street"
                        value={formData.street}
                        error={errors.street}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.streetNumber}
                        name="streetNumber"
                        value={formData.streetNumber}
                        error={errors.streetNumber}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.postcode}
                        name="postcode"
                        value={formData.postcode}
                        error={errors.postcode}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        required
                        label={labels.email}
                        name="email"
                        type="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange || !this.state.dirty}
                        label={labels.oldPassword}
                        name="oldPassword"
                        type="password"
                        value={formData.oldPassword}
                        error={errors.oldPassword}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange}
                        label={labels.newPassword}
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        error={errors.newPassword}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled={!this.props.profile.allowPasswordChange}
                        label={labels.confirmNewPassword}
                        name="confirmNewPassword"
                        type="password"
                        value={formData.confirmNewPassword}
                        error={errors.confirmNewPassword}
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <div
                    id="paymentDataTabPanel"
                    className="profile-form-tab-panel"
                    hidden={selectedTab !== 'paymentData'}
                    role="tabpanel"
                    tabIndex={-1}
                    aria-describedby="paymentDataTab"
                >
                    <TextField
                        disabled
                        label={labels.contractContractNumber}
                        name="contractContractNumber"
                        value={formData.contract.id}
                        error={errors.contractContractNumber}
                        onChange={e => this.handleChange(e)}
                    />
                    <DateField
                        disabled
                        locale={locale}
                        name="contractStartDate"
                        helperText={labels.birthdayHelperText}
                        label={labels.contractStartDate}
                        value={formData.contract.startDate}
                        error={errors.contractStartDate}
                        onChange={e => this.handleDateFieldChange(e)}
                    />
                    <DateField
                        disabled
                        locale={locale}
                        name="contractEndDate"
                        helperText={labels.birthdayHelperText}
                        label={labels.contractEndDate}
                        value={formData.contract.endDate}
                        error={errors.contractEndDate}
                        onChange={e => this.handleDateFieldChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractFirstName}
                        name="contractFirstName"
                        value={formData.contract.firstName}
                        error={errors.contractFirstName}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractLastName}
                        name="contractLastName"
                        value={formData.contract.lastName}
                        error={errors.contractLastName}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractStreet}
                        name="contractStreet"
                        value={formData.contract.street}
                        error={errors.contractStreet}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractHouseNumber}
                        name="contractHouseNumber"
                        value={formData.contract.houseNumber}
                        error={errors.contractHouseNumber}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractPostcode}
                        name="contractPostcode"
                        value={formData.contract.postcode}
                        error={errors.contractPostcode}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        disabled
                        label={labels.contractCity}
                        name="contractCity"
                        value={formData.contract.city}
                        error={errors.contractCity}
                        onChange={e => this.handleChange(e)}
                    />
                    <div className="profile-form-payment-method">
                        <strong>{labels.paymentMethod}</strong>
                        <ul>
                            <li>
                                <RadioButton
                                    label={labels.paymentMethodDebitOption}
                                    name="paymentMethod"
                                    value={PAYMENT_METHODS.debit}
                                    checked={formData.contract.paymentMethod === PAYMENT_METHODS.debit}
                                    onChange={e => this.handlePaymentMethodChange(e)}
                                />
                            </li>
                            <li>
                                <RadioButton
                                    name="paymentMethod"
                                    value={PAYMENT_METHODS.transfer}
                                    checked={formData.contract.paymentMethod === PAYMENT_METHODS.transfer}
                                    label={labels.paymentMethodTransferOption}
                                    onChange={e => this.handlePaymentMethodChange(e)}
                                />
                            </li>
                            <li>
                                <RadioButton
                                    name="paymentMethod"
                                    value={PAYMENT_METHODS.bitcoin}
                                    checked={formData.contract.paymentMethod === PAYMENT_METHODS.bitcoin}
                                    label={labels.paymentMethodBitcoinOption}
                                    onChange={e => this.handlePaymentMethodChange(e)}
                                />
                            </li>
                        </ul>
                    </div>
                    {formData.contract.paymentMethod === PAYMENT_METHODS.debit && (
                        <React.Fragment>
                            <IBANField
                                label={labels.IBAN}
                                name="IBAN"
                                value={formData.contract.IBAN}
                                error={errors['contract.IBAN']}
                                required
                                onChange={e => this.handlePaymentMethodChange(e)}
                            />
                            <div className="profile-form-sepa-approval">
                                <strong>{labels.sepaApproval}</strong>
                                <Checkbox
                                    required
                                    label={labels.sepaApprovalOption}
                                    name="sepaApproval"
                                    checked={formData.sepaApproval}
                                    error={errors.sepaApproval}
                                    onChange={e => this.handleChange(e)}
                                />

                                <small>{labels.sepaApprovalHelp}</small>
                            </div>
                        </React.Fragment>
                    )}
                    {formData.contract.paymentMethod === PAYMENT_METHODS.bitcoin && (
                        <div className="profile-form-bitcoin-message">
                            <strong>{labels.bitcoinMessage}</strong>
                        </div>
                    )}
                </div>
                <div className="profile-form-actions">
                    <Button disabled={!this.state.dirty} onClick={() => this.handleSubmit()}>
                        {labels.submitButton}
                    </Button>
                </div>
            </div>
        );
    }
}

const commonContractPropTypes = {
    IBAN: PropTypes.string,
    id: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    street: PropTypes.string,
    houseNumber: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string
};

const commonProfilePropTypes = {
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    sepaApproval: PropTypes.string,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string
};

ProfileForm.propTypes = {
    labels: PropTypes.shape({
        ...commonProfilePropTypes,
        contractContractNumber: PropTypes.string,
        contractStartDate: PropTypes.string,
        contractEndDate: PropTypes.string,
        contractFirstName: PropTypes.string,
        contractLastName: PropTypes.string,
        contractStreet: PropTypes.string,
        contractHouseNumber: PropTypes.string,
        contractPostcode: PropTypes.string,
        contractCity: PropTypes.string,
        paymentMethod: PropTypes.string,
        paymentMethodDebitOption: PropTypes.string,
        paymentMethodTransferOption: PropTypes.string,
        paymentMethodBitcoinOption: PropTypes.string,
        sepaApproval: PropTypes.string,
        sepaApprovalOption: PropTypes.string,
        sepaApprovalHelp: PropTypes.string,
        bitcoinMessage: PropTypes.string,
        submitButton: PropTypes.string
    }),
    profile: PropTypes.shape({
        ...commonProfilePropTypes,
        contract: PropTypes.shape({
            ...commonContractPropTypes
        }),
        allowPasswordChange: PropTypes.bool,
        birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    errors: PropTypes.shape(commonProfilePropTypes),
    onSubmit: PropTypes.func
};
ProfileForm.defaultProps = {
    labels: {
        personalDataTab: 'Customer Data',
        paymentDataTab: 'Contract Data',
        firstName: 'First Name',
        lastName: 'Last Name',
        birthday: 'Date of birth',
        birthdayHelperText: 'Editing format dd.mm.yyyy',
        city: 'City',
        street: 'Street',
        streetNumber: 'Street Number',
        postcode: 'Postcode',
        IBAN: 'Bank account number',
        email: 'Email',
        oldPassword: 'Old password',
        newPassword: 'New password',
        confirmNewPassword: 'Repeat new password',
        contractContractNumber: 'Contract Number',
        contractStartDate: 'Start Date',
        contractEndDate: 'End Date',
        contractFirstName: 'First Name',
        contractLastName: 'Last Name',
        contractStreet: 'Street',
        contractHouseNumber: 'House Number',
        contractPostcode: 'Postcode',
        contractCity: 'City',
        paymentMethod: 'Payment options',
        paymentMethodDebitOption: 'Debit',
        paymentMethodTransferOption: 'Transfer',
        paymentMethodBitcoinOption: 'Bitcoin',
        sepaApproval: 'Issuing SEPA-Mandate',
        sepaApprovalOption: 'I agree to terms',
        sepaApprovalHelp:
            'The named account holder authorizes the Nordic Energy. Ltd. to collect payments from his account by direct debit. At the same time, said account holder instructs its credit institution to redeem the direct debits drawn by the supplier into its account. Note: Within eight weeks, starting with the debit date, the reimbursement of the debited amount can be reclaimed. The conditions agreed with the bank apply.',
        bitcoinMessage:
            'Nordic Energy accepts your Monthly payments in Bitcoin. Whenever your monthly installment is due, we will send you a link with instructions how to pay your Energy in Bitcoin or Bitcoin Cash, using the then current Bitcoin-Euro Exchange rate.',
        submitButton: 'Save'
    },
    profile: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        postcode: '',
        city: '',
        street: '',
        streetNumber: '',
        contract: {
            IBAN: '',
            id: '',
            startDate: '',
            endDate: '',
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            postcode: '',
            city: ''
        }
    },
    errors: {},
    onSubmit: () => {}
};

export default ProfileForm;
