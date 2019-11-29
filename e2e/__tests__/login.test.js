import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let loginPage, overviewPage, pageFactory;

describe('Sign-in / login app processes', () => {
    beforeAll(async () => {
        const pageFactory = await factory();
        loginPage = await pageFactory.createLoginPage();
    }, timeout);

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can login and logout into the app',
        async () => {
            await loginPage.open();
            overviewPage = await loginpage.login(credentials.username, credentials.password);
            await overviewPage.open();
            await overviewPage.logout();
        },
        timeout
    );

    test(
        'User can navigate to restore password page',
        async () => {
            await loginPage.open();
            await loginPage.clickForgotPassword();
        },
        timeout
    );
});
