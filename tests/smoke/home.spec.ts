import {expect, test} from '@playwright/test';
import { HomePage } from '../../pages/home-page';

test('Home page loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await expect(page).toHaveTitle(/Automation Exercise/i);
});
