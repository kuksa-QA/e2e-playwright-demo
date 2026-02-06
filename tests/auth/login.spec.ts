import {expect, test} from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { LoginPage } from '../../pages/login-page';
import {stableTestUser} from "../../fixture/test-data";

test('User can login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigate();
    await homePage.loginButton.click();

    await loginPage.login(
        stableTestUser.email,
        stableTestUser.password
    );

    await expect(homePage.logoutButton).toBeVisible();
});
