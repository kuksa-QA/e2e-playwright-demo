import { expect, test, Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../../../pages/home-page';
import { LoginPage } from '../../../pages/login-page';
import { AccountCreatePage } from '../../../pages/account-create-page';
import { AccountCreatedPage } from '../../../pages/account-created-page';
import { AccountDeletePage } from '../../../pages/account-delete-page';
import { testUser } from '../../../fixtures/test-data';

test.describe.configure({ mode: 'serial' });

test.describe('Account lifecycle (multi-test flow)', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let email: string;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountCreatePage: AccountCreatePage;
    let accountCreatedPage: AccountCreatedPage;
    let deleteAccountPage: AccountDeletePage;

    test.beforeAll(async ({ browser: playwrightBrowser }) => {
        browser = playwrightBrowser;
        context = await browser.newContext();
        page = await context.newPage();

        email = testUser.generateEmail();

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
    });

    test('User data for new account is accepted', async () => {
        await homePage.navigate();
        await homePage.header.loginButton.click();

        accountCreatePage = await loginPage.signUp(testUser.name, email);

        await expect(accountCreatePage.page).toHaveURL(accountCreatePage.url);
    });

    test('User can create a new account', async () => {
        await accountCreatePage.fillRequiredDetails(
            testUser.password,
            testUser.first_name,
            testUser.last_name,
            testUser.address,
            testUser.country,
            testUser.state,
            testUser.city,
            testUser.zipcode,
            testUser.phone_number
        );

        accountCreatedPage = await accountCreatePage.createAccount();

        await expect(accountCreatedPage.page).toHaveURL(accountCreatedPage.url);
    });

    test('User can go to Home page after creating account', async () => {
        homePage = await accountCreatedPage.goToHomePage();

        await expect(homePage.page).toHaveURL(homePage.url);
        await expect(homePage.header.logoutButton).toBeVisible();
    });

    test('User can delete account', async () => {
        deleteAccountPage = await homePage.header.deleteAccount();

        await expect(deleteAccountPage.page).toHaveURL(deleteAccountPage.url);
    });

    test('User can go to Home page after deleting account', async () => {
        homePage = await deleteAccountPage.goToHomePage();

        await expect(homePage.page).toHaveURL(homePage.url);
        await expect(homePage.header.loginButton).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
});
