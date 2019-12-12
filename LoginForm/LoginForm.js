import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import Button from '../Button';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.defaultUsername || '',
            password: ''
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
    }

    handleForgotPasswordLinkClick(event) {
        event.preventDefault();
        this.props.onForgotPasswordLinkClick();
    }

    render() {
        const { labels, errors } = this.props;
        const { username, password } = this.state;

        return (
            <form className="login-form" onSubmit={event => this.handleSubmit(event)}>
                <TextField
                    className="username-field"
                    darkMode
                    label={labels.usernameField}
                    type="text"
                    name="username"
                    value={username}
                    error={errors.username}
                    onChange={event => this.handleChange(event)}
                />
                <TextField
                    className="password-field"
                    darkMode
                    label={labels.passwordField}
                    type="password"
                    name="password"
                    value={password}
                    error={errors.password}
                    helperText={
                        <a
                            className="reset-password-link"
                            href="/restore-password"
                            onClick={event => {
                                this.handleForgotPasswordLinkClick(event);
                            }}
                        >
                            {labels.forgotPasswordLink}
                        </a>
                    }
                    onChange={event => this.handleChange(event)}
                />
                <Button type="success">{labels.loginButton}</Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    labels: PropTypes.shape({
        usernameField: PropTypes.string,
        passwordField: PropTypes.string,
        resetPasswordToken: PropTypes.string,
        loginButton: PropTypes.string
    }),
    errors: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string
    }),
    onForgotPasswordLinkClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    defaultUsername: PropTypes.string
};
LoginForm.defaultProps = {
    errors: {}
};

export default LoginForm;
