import { expect, test } from '../../../fixtures/pages';
 
test.describe('Login page', () => {
    test('User cannot login with invalid password', async ({ homePage }) => {
        await homePage.navigate();
        const loginPage = await homePage.header.goToLoginSignUpPage();
 
        await loginPage.login('wrong@mail.com', 'wrong');
        await expect(loginPage.loginForm).toContainText('Your email or password is incorrect');
    });
})