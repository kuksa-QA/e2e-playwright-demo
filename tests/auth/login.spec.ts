import {expect, test} from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { LoginPage } from '../../pages/login-page';

test('User can login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigate();
    await homePage.loginButton.click();

    await loginPage.login(
        'test_test_test@gmail.com',
        'test_test_test'
    );

    await expect(homePage.logoutButton).toBeVisible();
});
