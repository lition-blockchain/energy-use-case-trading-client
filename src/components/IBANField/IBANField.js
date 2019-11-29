import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IBAN from 'iban';
import classNames from 'classnames';
import TextField from '../TextField';
import './IBANField.css';

class IBANField extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value || '' };
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;

        if (prevProps.value !== value) {
            this.setState({ value });
        }
    }

    handleChange(event) {
        const { value, name } = event.target;
        const { onChange } = this.props;
        const formattedValue = IBAN.printFormat(value, '');

        this.setState({ value: formattedValue });
        onChange && onChange({ ...event, target: { value: formattedValue, name } });
    }

    render() {
        const value = String(this.state.value || '');
        const { className, label, helperText, error, disabled, required, name, onFocus, onBlur } = this.props;
        const classes = classNames('iban-field', className);

        return (
            <div className={classes}>
                <TextField
                    required={required}
                    label={label}
                    helperText={helperText || 'e.g. FI37 1528 3500 1625 86'}
                    name={name}
                    value={IBAN.printFormat(value, ' ')}
                    error={error}
                    disabled={disabled}
                    onChange={event => this.handleChange(event)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
        );
    }
}

IBANField.propTypes = {
    className: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default IBANField;
