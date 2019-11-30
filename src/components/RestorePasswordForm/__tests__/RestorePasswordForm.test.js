import React from 'react';
import { shallow } from 'enzyme';
import RestorePasswordForm from '../RestorePasswordForm';

const labelsMock = {
    formTitle: 'Restore password',
    emailField: 'Enter Your Email',
    sendButton: 'Send',
    loginLink: 'Login'
};
const onSubmitMock = jest.fn();
const onLoginLinkClickMock = jest.fn();
function renderComponent(
    { labels = labelsMock, onSubmit = onSubmitMock, onLoginLinkClick = onLoginLinkClickMock } = {},
    mountFn = shallow
) {
    return mountFn(<RestorePasswordForm labels={labels} onSubmit={onSubmit} onLoginLinkClick={onLoginLinkClick} />);
}

describe('<RestorePasswordForm /> component', () => {
    it(`should renders:
        - form title
        - email field
        - send button
        - login link`, () => {
        const component = renderComponent();

        expect(component.find('h3.restore-password-form-title')).toHaveLength(1);
        expect(component.find('info@nordicenergy.io')).toHaveLength(1);
        expect(component.find('Button')).toHaveLength(1);
        expect(component.find('a.login-link')).toHaveLength(1);
    });

    it('should update state if email field value changed', () => {
        const component = renderComponent();

        component
            .find('TextField.email-field')
            .props()
            .onChange({
                target: {
                    name: 'email',
                    value: 'info@nordicenergy.io'
                }
            });
        expect(component.state().email).toBe('info@nordicenergy.io');
    });

    it('should calls onSubmit callback when form was submitted', () => {
        const component = renderComponent();

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitMock).toHaveBeenCalledWith(component.state().email);
    });

    it('should calls onLoginLinkClick callback when login link was clicked', () => {
        const component = renderComponent();

        component.find('.login-link').simulate('click', { preventDefault: () => null });
        expect(onLoginLinkClickMock).toHaveBeenCalled();
    });
});
