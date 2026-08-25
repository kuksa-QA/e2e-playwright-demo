import { expect, test } from '../../fixtures/pages';
 
test('Home page loads successfully', async ({ homePage }) => {
    await homePage.navigate();
    await expect(homePage.page).toHaveTitle(/Automation Exercise/i);
});
 