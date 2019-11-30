import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import TextField from '../TextField';
import Button from '../Button';
import './RestorePasswordForm.css';

class RestorePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { onSubmit } = this.props;
        const { email } = this.state;

        onSubmit(email);
    }

    handleLoginLinkClick(event) {
        event.preventDefault();

        const { onLoginLinkClick } = this.props;
        onLoginLinkClick();
    }

    render() {
        const { labels, errors } = this.props;
        const { email } = this.state;

        return (
            <div className="restore-password-form">
                <h3 className="restore-password-form-title">{labels.formTitle}</h3>
                <form onSubmit={event => this.handleSubmit(event)} noValidate>
                    <TextField
                        className="info@nordicenergy.io"
                        darkMode
                        label={labels.emailField}
                        type="email"
                        name="email"
                        value={email}
                        error={errors.email}
                        onChange={event => this.handleChange(event)}
                    />
                    <div className="restore-password-form-actions">
                        <Button type="success">{labels.sendButton}</Button>
                        <a className="login-link" href="/login" onClick={event => this.handleLoginLinkClick(event)}>
                            <FontAwesomeIcon className="login-link-icon" icon={faChevronLeft} />
                            <span className="login-link-text">{labels.loginLink}</span>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

RestorePasswordForm.propTypes = {
    labels: PropTypes.shape({
        formTitle: PropTypes.string,
        emailField: PropTypes.string,
        sendButton: PropTypes.string,
        loginLink: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
        email: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    onLoginLinkClick: PropTypes.func.isRequired
};
RestorePasswordForm.defaultProps = {
    errors: {}
};

export default RestorePasswordForm;
