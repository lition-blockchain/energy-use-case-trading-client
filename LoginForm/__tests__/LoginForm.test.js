import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from '../LoginForm';

const labelsMock = {
    usernameField: 'Username',
    passwordField: 'Password',
    forgotPasswordLink: 'Forgot your password?',
    loginButton: 'Login'
};
const onForgotPasswordLinkClickMock = jest.fn();
const onSubmitMock = jest.fn();
function renderComponent(
    {
        labels = labelsMock,
        onForgotPasswordLinkClick = onForgotPasswordLinkClickMock,
        onSubmit = onSubmitMock,
        defaultUsername
    } = {},
    mountFn = shallow
) {
    return mountFn(
        <LoginForm
            labels={labels}
            onForgotPasswordLinkClick={onForgotPasswordLinkClick}
            onSubmit={onSubmit}
            defaultUsername={defaultUsername}
        />
    );
}

describe('<LoginForm /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it(`should render
        - username field
        - password field
        - login button`, () => {
        const component = renderComponent();

        expect(component.find('TextField')).toHaveLength(2);
        expect(component.find('Button')).toHaveLength(1);
    });

    it('should update state if username field value change', () => {
        const component = renderComponent();

        component
            .find('TextField.username-field')
            .props()
            .onChange({
                target: {
                    name: 'username',
                    value: 'test'
                }
            });
        expect(component.state().username).toBe('test');
    });

    it('should update state if password field value change', () => {
        const component = renderComponent();

        component
            .find('TextField.password-field')
            .props()
            .onChange({
                target: {
                    name: 'password',
                    value: 'test'
                }
            });
        expect(component.state().password).toBe('test');
    });

    it('should call onForgotPasswordLinkClick callback when forgot password link button was clicked', () => {
        const component = renderComponent({}, mount);

        component.find('.reset-password-link').simulate('click', { preventDefault: () => null });
        expect(onForgotPasswordLinkClickMock).toHaveBeenCalled();
    });

    it('should call onSubmit callback when form was submitted', () => {
        const component = renderComponent();

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitMock).toHaveBeenCalledWith(component.state());
    });

    it('should set default username field', () => {
        const component = renderComponent({ defaultUsername: 'demo@example.com' });

        expect(component.state().username).toBe('demo@example.com');
        expect(component.find('TextField.username-field').props().value).toBe('demo@example.com');
    });
});
