import React from 'react';
import { Profile } from '../Profile';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import * as userActionPerformers from '../../../action_performers/users';
import * as notificationsActionPerformers from '../../../action_performers/notifications';
import * as appActions from '../../../action_performers/app';

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

function renderComponent(props = {}, mountFn = shallowWithIntl) {
    return mountFn(<Profile {...props} context={context} />);
}

describe('<Profile /> Container', () => {
    beforeEach(() => {
        appActions.performSetupLoaderVisibility = jest.fn();
    });

    it(`should renders with:
        - profile form
        - title`, () => {
        const component = renderComponent();

        expect(component.find('ProfileForm')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('h1').text()).toBe('Profile');
    });

    it('should map state properties', () => {
        const stateMock = {
            Users: {
                profile: {
                    loading: true,
                    data: { user: { foo: 'bar' } },
                    error: 'test-loading-error'
                },
                updatedProfile: {
                    loading: false,
                    data: { user: { foo: 'bar' } },
                    error: 'test-updating-error'
                }
            }
        };
        const props = Profile.mapStateToProps(stateMock);

        expect(props.loading).toEqual(true);
        expect(props.profile).toEqual(stateMock.Users.profile.data.user);
        expect(props.updatedProfile).toEqual(stateMock.Users.updatedProfile.data.user);
        expect(props.updatingError).toEqual(stateMock.Users.updatedProfile.error);
        expect(props.loadingError).toEqual(stateMock.Users.profile.error);
    });

    it('should validate fields', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: '',
            lastName: '',
            email: undefined,
            street: '',
            postcode: '',
            city: '',
            streetNumber: '',
            newPassword: '',
            confirmNewPassword: '',
            oldPassword: '',
            contract: {
                paymentMethod: 'debit',
                IBAN: ''
            }
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(jest.fn());

        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);
        expect(userActionPerformers.performUpdateUserData).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('firstName');
        expect(component.state().errors).toHaveProperty('lastName');
        expect(component.state().errors).toHaveProperty('email');
        expect(component.state().errors).toHaveProperty('street');
        expect(component.state().errors).toHaveProperty('postcode');
        expect(component.state().errors).toHaveProperty('city');
        expect(component.state().errors).toHaveProperty('streetNumber');
        expect(component.state().errors['contract.IBAN']).toEqual({
            defaultMessage: 'Enter your IBAN.',
            id: 'app.profilePage.errors.iban'
        });
        expect(component.state().errors).toHaveProperty('sepaApproval');
        expect(component.state().errors).not.toHaveProperty('confirmNewPassword');
        expect(component.state().errors).not.toHaveProperty('newPassword');
        expect(component.state().errors).not.toHaveProperty('oldPassword');

        dataMock.email = 'info@nordicenergy.io';
        dataMock.oldPassword = '';
        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);

        expect(component.state().errors).toHaveProperty('oldPassword');

        dataMock.email = 'info@nordicenergy.io';
        dataMock.oldPassword = 'ss';
        dataMock.newPassword = '';
        dataMock.confirmNewPassword = 'ss';
        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);

        expect(component.state().errors).toHaveProperty('newPassword');
        expect(component.state().errors).toHaveProperty('confirmNewPassword'); // passwords mismatch
        expect(component.state().errors).not.toHaveProperty('oldPassword');

        dataMock.oldPassword = '';
        dataMock.newPassword = 'ss';
        dataMock.confirmNewPassword = '';
        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);

        expect(component.state().errors).not.toHaveProperty('newPassword');
        expect(component.state().errors).toHaveProperty('confirmNewPassword'); // confirm is required
        expect(component.state().errors).toHaveProperty('oldPassword');

        console.warn.mockRestore();
        userActionPerformers.performUpdateUserData.mockRestore();
    });

    it('should validate password fields', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: '',
            lastName: '',
            email: 'info@nordicenergy.io',
            street: '',
            postcode: '',
            city: '',
            streetNumber: '',
            newPassword: 'vamise',
            confirmNewPassword: 'vamise',
            oldPassword: '',
            contract: {
                paymentMethod: 'transfer',
                IBAN: ''
            }
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(jest.fn());

        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);
        expect(userActionPerformers.performUpdateUserData).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('confirmNewPassword');
        expect(component.state().errors).toHaveProperty('oldPassword');

        console.warn.mockRestore();
        userActionPerformers.performUpdateUserData.mockRestore();
    });

    it('should shows server error if authentication is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            profile: null,
            loadingError: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message:
                "Can't load profile data from Nordic Energy web server. Please contact administrator to resolve the error."
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());

        component.setProps({
            loading: false,
            updatedProfile: null,
            updatingError: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'An error occurred while updating profile data: [Error message]'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should calls performUpdateUserData after form was submitted', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: 'fname',
            lastName: 'lname',
            email: 'info@nordicenergy.io',
            street: 'street',
            postcode: '111',
            city: 'city',
            streetNumber: '1',
            newPassword: 'password',
            confirmNewPassword: 'password',
            oldPassword: 'oldPassword',
            contract: {
                paymentMethod: 'debit',
                IBAN: 'DE78100500000890139229'
            },
            sepaApproval: true
        };
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(profileData => {
            component.setState({
                updated: true
            });
            component.setProps({
                loading: false,
                updatedProfile: profileData
            });
        });
        component.setProps({
            loading: true
        });
        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);

        delete dataMock.confirmNewPassword;
        delete dataMock.sepaApproval;
        expect(userActionPerformers.performUpdateUserData).toHaveBeenCalledWith({
            ...dataMock,
            ...dataMock.contract,
            contract: undefined
        });
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'success',
            message: 'Profile successfully updated'
        });
        userActionPerformers.performUpdateUserData.mockRestore();
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const profile = renderComponent();

        profile.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        profile.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });
});
