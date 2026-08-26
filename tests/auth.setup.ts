import { expect, test as setup } from '@playwright/test';
 
import { HomePage } from '../pages/home-page';
import { AUTH_FILE } from '../fixtures/auth';
import { blockThirdPartyNoise } from '../fixtures/network';
import { stableTestUser } from '../fixtures/test-data';

setup('authenticate', async ({ page }) => {
    await blockThirdPartyNoise(page);
 
    const homePage = new HomePage(page);
    await homePage.navigate();
 
    const loginPage = await homePage.header.goToLoginSignUpPage();
    await loginPage.login(stableTestUser.email, stableTestUser.password);

    await expect(page.locator('header')).toContainText('Logged in as');
 
    await page.context().storageState({ path: AUTH_FILE });
});