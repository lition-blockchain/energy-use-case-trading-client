import React from 'react';
import { shallow } from 'enzyme';
import MeterReadingForm from '../MeterReadingForm';
import { TextField, DateField, Button } from '../../index';

const DEFAULT_LABELS = {
    meterReadingsField: 'Meter reading',
    dateField: 'Date of readings',
    commentField: 'Comments',
    submitButton: 'Submits',
    meterNumberTitle: 'Number of meters',
    incorrectMeterNumber: 'Number of meter is still not defined.'
};

const MOCK_FORM_DATA = {
    meterReadings: '123',
    date: '1535543065'
};

const INIT_METER_READING = {
    meterReadings: '',
    date: null
};

function renderComponent(props = {}, renderer = shallow) {
    return renderer(<MeterReadingForm {...props} />);
}

describe('<MeterReadingForm /> Component', () => {
    it(`should contains following elements: 
        - <TextField /> elements;
        - <DateField /> element;
        - <Button /> elements;
    `, () => {
        const component = renderComponent();

        expect(component.find(TextField)).toHaveLength(1);
        expect(component.find(DateField)).toHaveLength(1);
        expect(component.find(Button)).toHaveLength(1);
    });

    it('should contains elements with specific properties', () => {
        const component = renderComponent({
            errors: {
                meterReadings: 'Meter readings is not a number',
                date: 'Date is required'
            },
            labels: DEFAULT_LABELS,
            locale: 'en',
            numberOfMeter: 1234
        });
        component.setState(MOCK_FORM_DATA);

        const textFields = component.find(TextField);
        const dateFields = component.find(DateField);
        const buttons = component.find(Button);

        const meterReadingTextField = textFields.at(0);
        expect(meterReadingTextField.props().name).toEqual('meterReadings');
        expect(meterReadingTextField.props().label).toEqual('Meter reading');
        expect(meterReadingTextField.props().value).toEqual('123');
        expect(meterReadingTextField.props().addon).toEqual('kWh');
        expect(meterReadingTextField.props().disabled).toBe(false);
        expect(typeof meterReadingTextField.props().onChange).toBe('function');
        expect(meterReadingTextField.props().error).toEqual('Meter readings is not a number');
        expect(
            meterReadingTextField
                .html()
                .includes(
                    '<span>Number of meters: <span class="meter-reading-form-field-helper-text">1234</span></span>'
                )
        ).toEqual(true);

        const dateField = dateFields.at(0);
        expect(dateField.props().name).toEqual('date');
        expect(dateField.props().label).toEqual('Date of readings');
        expect(dateField.props().value).toEqual('1535543065');
        expect(dateField.props().locale).toEqual('en');
        expect(dateField.props().disabled).toBe(false);
        expect(dateField.props().error).toEqual('Date is required');
        expect(typeof dateField.props().onChange).toBe('function');

        const submitButton = buttons.at(0);
        expect(submitButton.props().type).toEqual('primary');
        expect(submitButton.html().includes('Submits')).toEqual(true);
        expect(submitButton.props().disabled).toEqual(false);
    });

    it('should contains elements with default properties, disable button, show incorrect meter number label when data is incorrect', () => {
        const component = renderComponent();

        const textFields = component.find(TextField);
        const dateFields = component.find(DateField);
        const buttons = component.find(Button);

        const meterReadingTextField = textFields.at(0);
        expect(meterReadingTextField.props().name).toEqual('meterReadings');
        expect(meterReadingTextField.props().label).toEqual('Meter readings');
        expect(meterReadingTextField.props().value).toEqual('');
        expect(meterReadingTextField.props().addon).toEqual('kWh');
        expect(typeof meterReadingTextField.props().onChange).toBe('function');
        expect(meterReadingTextField.props().error).toEqual(undefined);

        expect(
            meterReadingTextField
                .html()
                .includes(
                    '<span class="meter-reading-form-field-helper-text--wrong">Number of meter is still not defined.</span>'
                )
        ).toEqual(true);

        const dateField = dateFields.at(0);
        expect(dateField.props().name).toEqual('date');
        expect(dateField.props().label).toEqual('Date of reading');
        expect(dateField.props().value).toEqual(null);
        expect(dateField.props().locale).toEqual('en');
        expect(dateField.props().error).toEqual(undefined);
        expect(typeof dateField.props().onChange).toBe('function');

        const submitButton = buttons.at(0);
        expect(submitButton.props().type).toEqual('primary');
        expect(submitButton.html().includes('Submit')).toEqual(true);
        expect(submitButton.props().disabled).toEqual(true);
    });

    it('should update state if data field value change', () => {
        const component = renderComponent();

        component
            .find('DateField[name="date"]')
            .props()
            .onChange({
                name: 'date',
                value: 'test date'
            });
        component
            .find('TextField[name="meterReadings"]')
            .props()
            .onChange({
                target: {
                    name: 'meterReadings',
                    value: 'test meterReadings'
                }
            });
        expect(component.state().meterReadings).toBe('test meterReadings');
        expect(component.state().date).toBe('test date');
    });

    it('should call onSubmit data when form was submitted', () => {
        const onSubmitStub = jest.fn();

        const component = renderComponent({ onSubmit: onSubmitStub });
        component.setState(MOCK_FORM_DATA);

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitStub).toHaveBeenCalledWith({
            meterReadings: '123',
            date: '2018-08-29'
        });
    });

    it('should set default state data after meter reading has successfully submitted', () => {
        const component = renderComponent();
        component.setState(MOCK_FORM_DATA);

        component.setProps({ isSuccessfullySubmitted: false });

        expect(component.state().meterReadings).toEqual(MOCK_FORM_DATA.meterReadings);
        expect(component.state().date).toEqual(MOCK_FORM_DATA.date);

        component.setProps({ isSuccessfullySubmitted: true });

        expect(component.state().meterReadings).toEqual(INIT_METER_READING.meterReadings);
        expect(component.state().date).toEqual(INIT_METER_READING.date);
    });

    it('should render with disabled elements', () => {
        const component = renderComponent({ disabled: true });
        component.setState(MOCK_FORM_DATA);

        const textFields = component.find(TextField);
        const dateFields = component.find(DateField);
        const buttons = component.find(Button);

        const meterReadingTextField = textFields.at(0);
        expect(meterReadingTextField.props().disabled).toBe(true);

        const dateField = dateFields.at(0);
        expect(dateField.props().disabled).toBe(true);

        const submitButton = buttons.at(0);
        expect(submitButton.props().disabled).toEqual(true);
    });
});
