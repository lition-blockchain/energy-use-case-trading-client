import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProducerInfo, Button, BackLink } from '../../components';
import { Producer as messages } from '../../services/translations/messages';
import { prepareProducerInfoProps } from '../Producer';
import { performGetUserData } from '../../action_performers/users';
import { performGetProducer, performGetProducerHistory } from '../../action_performers/producers';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { PATHS } from '../../services/routes';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './MyProducer.css';

export class MyProducer extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            { ...PATHS.overview, label: formatMessage(PATHS.overview.label) },
            {
                ...PATHS.myProducer,
                label: formatMessage(PATHS.myProducer.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(state) {
        return {
            loading:
                state.Producers.producer.loading ||
                state.Users.profile.loading ||
                state.Producers.producerHistory.loading,
            profile: state.Users.profile.data,
            producer: state.Producers.producer.data,
            producerHistory: state.Producers.producerHistory.data,
            error: state.Producers.producer.error || state.Users.profile.error || state.Producers.producerHistory.error
        };
    }

    componentDidMount() {
        performGetUserData();
        this.fetchProducer();
    }

    componentDidUpdate(prevProps) {
        const { profile: { user: prevUser = {} } = {}, error: oldError } = prevProps;
        const { profile: { user = {} } = {}, loading, error } = this.props;

        if (user.currentProducerId !== prevUser.currentProducerId) {
            this.fetchProducer();
        }

        if (!loading && error && error !== oldError) {
            performPushNotification({ message: error.message, type: 'error' });
        }

        performSetupLoaderVisibility(loading);
    }

    fetchProducer() {
        const { profile: { user } = {} } = this.props;
        if (user && user.currentProducerId) {
            performGetProducer(user.currentProducerId);
            performGetProducerHistory(user.currentProducerId);
        }
    }

    handleBackLinkClick(event) {
        event.preventDefault();
        const { history } = this.context.router;
        history.push(PATHS.overview.path);
    }

    openProducersPage() {
        const { history } = this.context.router;
        history.push(PATHS.buyEnergy.path);
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { loading, producer = {}, profile: { user } = {} } = this.props;

        const producerInfoProps = prepareProducerInfoProps(formatMessage, producer, user);

        return (
            <section className="my-producer-page" aria-busy={loading}>
                <section className="my-producer-page-info-container">
                    <h1>
                        <BackLink onClick={event => this.handleBackLinkClick(event)} />
                        <span>{formatMessage(messages.header)}</span>
                    </h1>
                    <ProducerInfo {...producerInfoProps} />
                </section>
                <section className="my-producer-page-controls">
                    <Button onClick={() => this.openProducersPage()}>{formatMessage(messages.showButton)}</Button>
                </section>
            </section>
        );
    }
}

MyProducer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

MyProducer.propTypes = {
    loading: PropTypes.bool,
    producer: PropTypes.object,
    producerHistory: PropTypes.array,
    profile: PropTypes.object,
    error: PropTypes.object
};

MyProducer.defaultProps = {
    loading: false,
    producer: {},
    producerHistory: [],
    profile: {},
    error: null
};

export default connect(MyProducer.mapStateToProps)(MyProducer);
