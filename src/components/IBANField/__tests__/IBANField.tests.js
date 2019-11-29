import React from 'react';
import { shallow } from 'enzyme';
import IBANField from '../IBANField';

const stubs = {
    onChange: jest.fn()
};

function renderComponent({ label = 'Test', onChange = stubs.onChange, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<IBANField {...otherProps} label={label} onChange={onChange} />);
}

describe('<IBANField /> component', () => {
    beforeEach(() => {
        stubs.onChange = jest.fn();
    });

    it(`should renders:
        - wrapper .iban-field;
        - TextField;`, () => {
        const ibanField = renderComponent();

        expect(ibanField.find('.iban-field')).toHaveLength(1);
        expect(ibanField.find('TextField')).toHaveLength(1);
    });

    it('should renders with helper text', () => {
        const ibanField = renderComponent();
        expect(ibanField.find('TextField').props().helperText).toBe('e.g. FI37 1528 3500 1625 86');
    });

    it('should format value', () => {
        const ibanField = renderComponent();
        ibanField.setProps({ value: 'DE34200400612345533292' });
        expect(ibanField.find('TextField').props().value).toBe('FI37 1528 3500 1625 86');

        ibanField.find('TextField').simulate('change', { target: { name: 'IBAN', value: 'FI34 1528 3500 +-*&^' } });
        expect(ibanField.find('TextField').props().value).toBe('FI34 1528 3500');
        expect(stubs.onChange).toHaveBeenCalledWith({ target: { name: 'IBAN', value: 'FI37 1528 3500 1625 86' } });

        ibanField.setProps({ value: null });
        expect(ibanField.find('TextField').props().value).toBe('');
    });
});
