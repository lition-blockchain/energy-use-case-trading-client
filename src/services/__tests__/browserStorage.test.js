import { clearToken, getToken, setToken } from '../browserStorage';

describe('Browser Storage Service', () => {
    const expectedKey = 'nordicenergy_auth_token';

    beforeEach(() => {
        sessionStorage.getItem = jest.fn();
        sessionStorage.setItem = jest.fn();
        sessionStorage.removeItem = jest.fn();
    });

    it('should provide method setting token', () => {
        setToken('test');
        const [[key, token]] = sessionStorage.setItem.mock.calls;
        expect(key).toEqual(expectedKey);
        expect(token).toEqual('test');
    });

    it('should provide method for getting token', () => {
        getToken();
        const [[key]] = sessionStorage.getItem.mock.calls;
        expect(key).toEqual(expectedKey);
    });

    it('should provide method for removing token', () => {
        clearToken();
        const [[key]] = sessionStorage.removeItem.mock.calls;
        expect(key).toEqual(expectedKey);
    });
});
