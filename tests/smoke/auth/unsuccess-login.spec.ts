import { expect, test } from '@playwright/test';

import { HomePage } from '../../../pages/home-page';
import { LoginPage } from '../../../pages/login-page';

test.describe('Login page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test('User cannot login with invalid password', async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        loginPage = await homePage.header.goToLoginSignUpPage();

        await loginPage.login('wrong@mail.com', 'wrong');
        await expect(loginPage.loginForm).toContainText('Your email or password is incorrect');
    });
})