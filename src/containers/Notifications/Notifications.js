import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { App as messages } from '../../services/translations/messages';
import './Notifications.css';
import Notification from './Notification';

export class Notifications extends Component {
    static mapStateToProps({ Notifications }) {
        return { pushedNotification: Notifications.pushedNotification.data };
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            notification: null,
            pendingNotification: null
        };
    }

    componentWillReceiveProps({ pushedNotification }) {
        const { open, notification } = this.state;

        if (open && notification) {
            this.setState({
                open: false,
                pendingNotification: pushedNotification
            });
        } else {
            this.setState({
                open: true,
                notification: pushedNotification,
                pendingNotification: null
            });
        }
    }

    handleNotificationClose() {
        this.setState({ open: false });

        if (this.state.pendingNotification) {
            this.setState({
                open: true,
                notification: { ...this.state.pendingNotification },
                pendingNotification: null
            });
        }
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { open, notification } = this.state;

        return (
            <div aria-hidden={!!open ? undefined : true} aria-live="assertive" className="notifications">
                <Notification
                    open={open}
                    defaultErrorMessage={formatMessage(messages.defaultErrorMessage)}
                    notification={notification}
                    onClose={() => this.handleNotificationClose()}
                />
            </div>
        );
    }
}

Notifications.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
Notifications.propTypes = {
    pushedNotification: PropTypes.object
};

export default connect(Notifications.mapStateToProps)(Notifications);
