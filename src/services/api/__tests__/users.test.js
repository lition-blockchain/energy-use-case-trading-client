import Axios from 'axios';
import {
    create,
    createResetPasswordToken,
    getUserData,
    login,
    logout,
    resetUserPassword,
    updateUserData,
    verifyResetPasswordToken
} from '../users';
import pick from 'lodash.pick';
import moment from 'moment/moment';

const userMockResponse = {
    birthday: '1980-10-10',
    basePrice: 49.08,
    workingPrice: 24.19,
    country: 'Finland',
    lastBillAvailable: true,
    lastBillAmount: '35,60',
    lastBillDate: 'April',
    showSoldOutPowerPlants: true,
    allowPasswordChange: true,
    contract: {
        IBAN: null,
        BIC: 'BELADEBEXXX',
        status: 'active',
        statusCode: 5000,
        statusCodeTitle: 'In Belieferung',
        paymentMethod: 'bitcoin',
        id: '1000086',
        startDate: '2018-10-01',
        endDate: '2018-10-01',
        firstName: 'Max',
        lastName: 'Mustermann',
        street: 'Arendsweg',
        houseNumber: '351',
        postcode: '10629',
        city: 'Berlin',
        email: 'infi@nordicenergy.io'
    },
    currentProducerId: 18,
    ledger: 'ethereumRopsten'
};

const convertDateToUnix = date => moment(date).unix();

describe('Users API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'patch').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
        Axios.post.mockRestore();
        Axios.patch.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
        Axios.post.mockClear();
        Axios.patch.mockClear();
    });

    it('should provide method for registration', () => {
        const userData = { firstName: 'John', lastName: 'Doe', username: 'test', password: 'test123' };
        create(userData);

        expect(Axios.post).toHaveBeenCalledWith('/api/user/create?lang=en', userData);
    });

    it('should provide method for login', () => {
        login({ username: 'test', password: 'password' });

        expect(Axios.post).toHaveBeenCalledWith(
            '/api/user/login',
            expect.objectContaining({
                username: 'test',
                password: 'password'
            })
        );
    });

    it('should provide method for logout', () => {
        logout();

        expect(Axios.get).toHaveBeenCalledWith('/api/user/logout');
    });

    it('should provide method for getting user', () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { user: {} }
            })
        );
        getUserData();

        expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');
    });

    it('should provide possibility to update user data', () => {
        const newUserDataDummy = {
            firstName: 'Hans',
            lastName: 'Wurst',
            birthday: 1530748800,
            IBAN: 'FI00 0000 0000 0000 0000 00',
            email: 'info@nordicenergy.io',
            street: 'Hoppenbrook',
            postcode: '24145',
            city: 'Kiel',
            streetNumber: '5'
        };
        Axios.post.mockReturnValue(
            Promise.resolve({
                data: {
                    firstName: 'Hans',
                    lastName: 'Wurst',
                    birthday: 1530748800,
                    IBAN: 'DE00 0000 0000 0000 0000 00',
                    email: 'nachrichtentechnik.kiel@googlemail.com',
                    street: 'Hoppenbrook',
                    postcode: '24145',
                    city: 'Kiel',
                    streetNumber: '5'
                }
            })
        );
        updateUserData(newUserDataDummy);
        expect(Axios.patch).toHaveBeenCalledWith('/api/user/updateUserData', newUserDataDummy);
    });

    it('should provide possibility to reset user password', () => {
        const newPasswordDataDummy = {
            newPassword: 'test',
            resetToken: 'token'
        };
        Axios.patch.mockReturnValue(
            Promise.resolve({
                updated: true
            })
        );
        resetUserPassword(newPasswordDataDummy.resetToken, newPasswordDataDummy.newPassword);
        const [[url, data]] = Axios.patch.mock.calls;
        expect(url).toBe('/api/user/resetPassword');
        expect(data).toEqual(newPasswordDataDummy);
    });

    it('should provide possibility to create reset password token', () => {
        const request = {
            email: 'jhon.doe@test.com'
        };
        Axios.post.mockReturnValue(
            Promise.resolve({
                created: true
            })
        );
        createResetPasswordToken(request.email);
        expect(Axios.post).toHaveBeenCalledWith('/api/user/resetPasswordToken?lang=en', request);
    });

    it('should provide possibility to verify reset password token', () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                valid: true
            })
        );
        verifyResetPasswordToken('testToken');
        expect(Axios.get).toHaveBeenCalledWith('/api/user/resetPasswordToken/testToken', {
            headers: { 'Cache-Control': 'no-cache' }
        });
    });

    describe('getUserData', () => {
        it('should convert all date fields from string to the unix format, if we will get user data', async () => {
            const onlyDatesFieldsFromUserMock = {
                ...pick(userMockResponse, ['birthday']),
                contract: {
                    ...pick(userMockResponse.contract, ['startDate', 'endDate'])
                }
            };

            Axios.get.mockReturnValueOnce(Promise.resolve({ data: { user: onlyDatesFieldsFromUserMock } }));

            const user = await getUserData();

            expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');
            expect(user).toEqual({
                data: {
                    user: {
                        birthday: convertDateToUnix(onlyDatesFieldsFromUserMock.birthday),
                        contract: {
                            endDate: convertDateToUnix(onlyDatesFieldsFromUserMock.contract.endDate),
                            startDate: convertDateToUnix(onlyDatesFieldsFromUserMock.contract.startDate)
                        }
                    }
                }
            });
        });

        it('should return a default value for the date fields, if we will not get user data (or some part of user data)', async () => {
            Axios.get.mockReturnValueOnce(Promise.resolve({}));

            const user = await getUserData();

            expect(Axios.get).toHaveBeenCalledWith('/api/user/getUserData');
            expect(user).toEqual({
                data: {
                    user: {
                        birthday: NaN,
                        contract: {
                            endDate: NaN,
                            startDate: NaN
                        }
                    }
                }
            });
        });
    });
});
