import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import DateField from '../DateField';
import Button from '../Button';
import './MeterReadingForm.css';
import moment from 'moment/moment';

const initMeterReading = {
    meterReadings: '',
    date: null
};

class MeterReadingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...initMeterReading
        };
    }

    componentDidUpdate(prevProps) {
        const { isSuccessfullySubmitted } = this.props;
        const isSubmitted = !prevProps.isSuccessfullySubmitted && isSuccessfullySubmitted;

        if (isSubmitted) {
            this.setState({ ...initMeterReading });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { meterReadings, date } = this.state;

        onSubmit({ meterReadings, date: date ? moment.unix(date).format('YYYY-MM-DD') : null });
    }

    handleChange({ name, value }) {
        this.setState({ [name]: value });
    }

    render() {
        const { props: { labels, errors, numberOfMeter, locale, disabled }, state: { meterReadings, date } } = this;
        const helperText = numberOfMeter ? (
            <span>
                {labels.meterNumberTitle}: <span className="meter-reading-form-field-helper-text">{numberOfMeter}</span>
            </span>
        ) : (
            <span className="meter-reading-form-field-helper-text--wrong">{labels.incorrectMeterNumber}</span>
        );

        return (
            <form className="meter-reading-form" onSubmit={event => this.handleSubmit(event)} noValidate>
                <div className="meter-reading-form-fields">
                    <div>
                        <TextField
                            name="meterReadings"
                            label={labels.meterReadingsField}
                            value={meterReadings}
                            disabled={disabled}
                            addon="kWh"
                            onChange={({ target }) => this.handleChange(target)}
                            error={errors.meterReadings}
                            helperText={helperText}
                        />
                    </div>
                    <div>
                        <DateField
                            name="date"
                            locale={locale}
                            disabled={disabled}
                            label={labels.dateField}
                            helperText={labels.dateHelperText}
                            value={date}
                            error={errors.date}
                            onChange={payload => this.handleChange(payload)}
                        />
                    </div>
                </div>
                <div className="meter-reading-form-actions">
                    <Button disabled={!numberOfMeter || disabled} type="primary">
                        {labels.submitButton}
                    </Button>
                </div>
            </form>
        );
    }
}

MeterReadingForm.propTypes = {
    labels: PropTypes.shape({
        meterReadingsField: PropTypes.string,
        dateField: PropTypes.string,
        dateHelperText: PropTypes.string,
        submitButton: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    numberOfMeter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    locale: PropTypes.string,
    isSuccessfullySubmitted: PropTypes.bool,
    errors: PropTypes.shape({
        meterReadings: PropTypes.string,
        date: PropTypes.string
    })
};
MeterReadingForm.defaultProps = {
    labels: {
        meterReadingsField: 'Meter readings',
        dateField: 'Date of reading',
        dateHelperText: 'Editing format dd.mm.yyyy',
        submitButton: 'Submit',
        meterNumberTitle: 'Number of meter',
        incorrectMeterNumber: 'Number of meter is still not defined.'
    },
    onSubmit: () => {},
    numberOfMeter: null,
    locale: 'en',
    isSuccessfullySubmitted: false,
    disabled: false,
    errors: {}
};

export default MeterReadingForm;
