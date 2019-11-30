import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationForm from '../ConfigurationForm';

const labelsDummy = {
    title: 'Configuration',
    blockChainField: 'Blockchain',
    addressField: 'Contract Address',
    button: 'Add Contract Address',
    helperText: 'Assign contract address to your Nordic Energy account'
};
function renderComponent({ labels = labelsDummy, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<ConfigurationForm labels={labels} {...otherProps} />);
}

describe('<ConfigurationForm /> component', () => {
    it(`should renders:
        - h3 with form title;
        - SelectField with "blockChain" name;
        - SelectField with "address" name;
        - Button;
        - small with helper text;`, () => {
        const configurationForm = renderComponent();

        expect(configurationForm.find('h3').text()).toBe(labelsDummy.title);
        expect(configurationForm.find('SelectField[name="blockChain"]')).toHaveLength(1);
        expect(configurationForm.find('SelectField[name="address"]')).toHaveLength(1);
        expect(configurationForm.find('Button')).toHaveLength(1);
        // TODO: change or remove text
        // expect(configurationForm.find('.configuration-form-actions > small').text()).toBe(labelsDummy.helperText);
    });

    it('should renders with errors', () => {
        const configurationForm = renderComponent({
            errors: { blockChain: 'Select blockchain', address: 'Select address' }
        });

        expect(configurationForm.find('SelectField[name="blockChain"]').props().error).toBe('Select blockchain');
        expect(configurationForm.find('SelectField[name="address"]').props().error).toBe('Select address');
    });

    it('should updates state when input values was changed', () => {
        const configurationForm = renderComponent();

        configurationForm
            .find('SelectField[name="blockChain"]')
            .props()
            .onChange({ name: 'blockChain', value: 'test' });
        configurationForm
            .find('SelectField[name="address"]')
            .props()
            .onChange({ name: 'address', value: 'abc' });
        expect(configurationForm.state()).toEqual({
            blockChain: 'test',
            address: 'abc'
        });
    });

    it('should calls onSubmit callback', () => {
        const onSubmitStub = jest.fn();
        const configurationForm = renderComponent({ onSubmit: onSubmitStub });

        configurationForm.setState({ blockChain: 'test', address: 'abc' });
        configurationForm.update();
        configurationForm.find('form').simulate('submit', new Event('submit'));
        expect(onSubmitStub).toHaveBeenCalledWith({
            blockChain: 'test',
            address: 'abc'
        });
    });
});
