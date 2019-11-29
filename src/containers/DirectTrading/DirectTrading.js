import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';

import { ConfigurationForm, Confirm, MetaMaskAlert, TradePositionsList } from '../../components';
import { BLOCKCHAIN_NETWORKS, META_MASK_DOWNLOAD_LINKS, META_MASK_LINK, TRADE_POSITIONS_LIMIT } from '../../constants';
import web3Service from '../../services/web3';
import { DirectTrading as messages } from '../../services/translations/messages';
import {
    performGetAvailableAddresses,
    performGetLedgerNetworks,
    performGetOpenTradePositions,
    performPerformTransaction,
    performRegisterLedgerAddress
} from '../../action_performers/transactions';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { performGetUserData } from '../../action_performers/users';

import AppPage from '../__shared__/AppPage';

import './DirectTrading.css';

const [ethereumNetwork, ledgerNetwork] = BLOCKCHAIN_NETWORKS;
const DAY_SECONDS = 86400;
const DEFAULT_FORM_DATA = {
    blockChain: ethereumNetwork,
    address: ''
};
const DEFAULT_FILTER = {
    energyAvailable: '',
    offerIssued: ''
};
const BLOCKCHAIN_NETWORKS_OPTIONS = [
    { value: ethereumNetwork, label: 'Ethereum' },
    { value: ledgerNetwork, label: 'PowerChain', disabled: true }
];

const SUCCESS_LEDGER_STATUS = 'success';

export class DirectTrading extends AppPage {
    constructor(props, context, breadcrumbs) {
        super(props, context, breadcrumbs);

        this.state = {
            isConfigured: false,
            isMetaMaskInstalled: web3Service.hasMetaMaskProvider(),
            formData: DEFAULT_FORM_DATA,
            formErrors: {
                blockChain: '',
                address: ''
            },
            filter: DEFAULT_FILTER,
            showConfirmationDialog: false,
            dialogMessage: ''
        };
    }

    static mapStateToProps(state) {
        return {
            loading:
                state.Transactions.openTradePositions.loading ||
                state.Transactions.availableAddresses.loading ||
                state.Transactions.performedTransaction.loading ||
                state.Transactions.ledgerNetworks.loading ||
                state.Users.profile.loading ||
                state.Transactions.ledgerStatus.loading,
            openTradePositions: state.Transactions.openTradePositions.data,
            availableAddresses: state.Transactions.availableAddresses.data.addresses,
            performedTransaction: state.Transactions.performedTransaction.data,
            error:
                state.Transactions.openTradePositions.error ||
                state.Transactions.availableAddresses.error ||
                state.Transactions.ledgerNetworks.error ||
                state.Transactions.ledgerStatus.error ||
                state.Users.profile.error,
            errorPerform: state.Transactions.performedTransaction.error,
            user: state.Users.profile.data.user,
            ledgerNetworks: state.Transactions.ledgerNetworks.data,
            ledgerStatus: state.Transactions.ledgerStatus.data
        };
    }

    componentDidMount() {
        if (this.state.isMetaMaskInstalled) {
            performGetAvailableAddresses();
            performGetLedgerNetworks();
            performGetUserData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { formatMessage } = this.context.intl;
        const { performedTransaction, loading, error, errorPerform, user, ledgerStatus } = this.props;
        const { isConfigured, isMetaMaskInstalled } = this.state;
        const configured = isConfigured && isConfigured !== prevState.isConfigured;
        const isLedgerStatusChanged = ledgerStatus.status && ledgerStatus !== prevProps.ledgerStatus;
        const isLedgerStatusSuccessful = ledgerStatus.status === SUCCESS_LEDGER_STATUS;
        const isNewTransactionPerformed = performedTransaction !== prevProps.performedTransaction;

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(this.pageId, loading);
        }

        if (isLedgerStatusChanged) {
            this.setState({
                isConfigured: isLedgerStatusSuccessful,
                showConfirmationDialog: !isLedgerStatusSuccessful,
                dialogMessage: isLedgerStatusSuccessful ? '' : formatMessage(messages.confirmationStatusDialogMessage)
            });
        }

        if ((isMetaMaskInstalled && configured && user && user.id) || isNewTransactionPerformed) {
            performGetOpenTradePositions(user.id, user.ledger);
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: formatMessage(messages.loadingErrorMessage), type: 'error' });
        }

        if (!loading && errorPerform && errorPerform !== prevProps.errorPerform) {
            performPushNotification({ message: formatMessage(messages.performTxErrorMessage), type: 'error' });
        }

        if (isNewTransactionPerformed && !loading) {
            this.setState({
                showConfirmationDialog: true,
                dialogMessage: `${formatMessage(messages.confirmationTransactionDialogMessage)} ${
                    performedTransaction.txHash
                }`
            });
        }
    }

    prepareValidator() {
        const labels = this.prepareLabels(messages);
        const validationSchema = {
            blockChain: {
                type: 'string',
                required: true,
                message: labels.metaMaskErrorsBlockChain
            },
            address: {
                type: 'string',
                required: true,
                message: labels.metaMaskErrorsAddress
            }
        };

        return new Validator(validationSchema);
    }

    handleBackClick() {
        this.setState({
            isConfigured: false,
            formData: DEFAULT_FORM_DATA,
            filter: DEFAULT_FILTER,
            sortParams: {}
        });
    }

    handleDateFilterChange({ value: timestamp }) {
        const { filter } = this.state;

        this.setState({
            filter: {
                ...filter,
                offerIssued: timestamp - timestamp % DAY_SECONDS
            }
        });
    }

    handleTradeVolumeChange(event) {
        const { filter } = this.state;
        const { value } = event.target;

        if (/^\d*(\.|,)?\d*$/.test(value)) {
            this.setState({
                filter: {
                    ...filter,
                    energyAvailable: value
                }
            });
        }
    }

    handleSubmit(formData) {
        const { formatMessage } = this.context.intl;
        const { ledger } = this.props.user;
        const { selectedLedgerNetwork } = this.props.ledgerNetworks;
        const validator = this.prepareValidator();
        const isWrongNetworkSelected = ledger && ledger !== selectedLedgerNetwork;

        validator.validate(formData, errors => {
            if (errors) {
                this.setState({
                    formErrors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            } else {
                isWrongNetworkSelected
                    ? performPushNotification({
                          message: formatMessage(messages.wrongNetworkNotificationMessage),
                          type: 'error'
                      })
                    : performRegisterLedgerAddress(ledger, formData.address);
                this.setState({
                    formData,
                    formErrors: { blockChain: '', address: '' }
                });
            }
        });
    }

    renderMetaMaskAlert(labels) {
        return (
            <MetaMaskAlert
                active={!this.state.isMetaMaskInstalled}
                labels={{
                    messageStart: labels.metaMaskMessageStart,
                    messageTail: labels.metaMaskMessageTail,
                    linksLabel: labels.metaMaskLinksLabel
                }}
                links={{
                    metamask: META_MASK_LINK,
                    ...META_MASK_DOWNLOAD_LINKS
                }}
            />
        );
    }

    renderConfigurationForm(addresses = [], labels) {
        const { formData, formErrors } = this.state;
        const addressesWithDefaultOption = [
            { value: null, label: labels.metaMaskConfigurationFormAddressPlaceholder, disabled: true }
        ].concat(addresses);

        return (
            <ConfigurationForm
                blockChainFieldOptions={BLOCKCHAIN_NETWORKS_OPTIONS}
                addressFieldOptions={addressesWithDefaultOption}
                labels={{
                    title: labels.metaMaskConfigurationFormTitle,
                    blockChainField: labels.metaMaskConfigurationFormBlockChainField,
                    addressField: labels.metaMaskConfigurationFormAddressField,
                    button: labels.metaMaskConfigurationFormButton,
                    helperText: labels.metaMaskConfigurationFormHelperText
                }}
                onSubmit={formData => this.handleSubmit(formData)}
                formData={formData}
                errors={formErrors}
            />
        );
    }

    renderOpenTradePositionsTable(tradePositions = [], labels) {
        const { filter, formData } = this.state;
        const { ledger } = this.props.user;
        const filteredTradePositions = tradePositions
            .filter(tradePosition => {
                let isPass = true;

                if (filter.offerIssued) {
                    isPass =
                        isPass &&
                        (tradePosition.offerIssuedTimestamp > filter.offerIssued &&
                            tradePosition.offerIssuedTimestamp <= filter.offerIssued + DAY_SECONDS);
                }

                if (filter.energyAvailable) {
                    isPass =
                        isPass &&
                        tradePosition.energyAvailableFloat >= parseFloat(filter.energyAvailable.replace(',', '.'));
                }

                return isPass;
            })
            .slice(0, TRADE_POSITIONS_LIMIT);
        const [contractAddress = ''] =
            (this.props.ledgerNetworks[ledger] && this.props.ledgerNetworks[ledger].addresses) || [];

        return (
            <TradePositionsList
                onBackClick={() => this.handleBackClick()}
                onTradeVolumeChange={event => this.handleTradeVolumeChange(event)}
                onDateFilterChange={payload => this.handleDateFilterChange(payload)}
                onPerformTransaction={position =>
                    performPerformTransaction(position, contractAddress, ledger, formData.address)
                }
                tradeVolume={filter.energyAvailable}
                dateFilter={filter.offerIssued}
                tradePositions={filteredTradePositions}
                labels={{
                    title: labels.metaMaskTradePositionsTitle,
                    tradeVolumeField: labels.metaMaskTradePositionsTradeVolumeField,
                    filterByDateField: labels.metaMaskTradePositionsFilterByDateField,
                    dateHelperText: labels.metaMaskTradePositionsDateHelperText,
                    sortToolbarTitle: labels.metaMaskTradePositionsSortToolbarTitle
                }}
            />
        );
    }

    handleConfirmButton() {
        this.setState({
            showConfirmationDialog: false
        });
    }

    renderConfirmationDialog() {
        const { dialogMessage } = this.state;
        return (
            <Confirm
                onConfirm={() => this.handleConfirmButton()}
                labels={{
                    confirmButton: 'OK',
                    message: dialogMessage
                }}
                show={this.state.showConfirmationDialog}
            />
        );
    }

    render() {
        const { loading, openTradePositions, availableAddresses } = this.props;
        const labels = this.prepareLabels(messages);

        return (
            <section className="direct-trading-page" aria-busy={loading}>
                {this.renderConfirmationDialog()}
                <h1>{labels.pageTitle}</h1>
                <h2>{labels.pageSubTitle}</h2>
                {this.renderMetaMaskAlert(labels)}
                {!this.state.isConfigured ? this.renderConfigurationForm(availableAddresses, labels) : null}
                {this.state.isConfigured ? this.renderOpenTradePositionsTable(openTradePositions, labels) : null}
            </section>
        );
    }
}

DirectTrading.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

DirectTrading.propTypes = {
    loading: PropTypes.bool,
    availableAddresses: PropTypes.array,
    openTradePositions: PropTypes.array,
    error: PropTypes.object,
    errorPerform: PropTypes.object
};

DirectTrading.defaultProps = {
    loading: false,
    availableAddresses: [],
    openTradePositions: [],
    error: null,
    errorPerform: null
};

export default connect(DirectTrading.mapStateToProps)(DirectTrading);
