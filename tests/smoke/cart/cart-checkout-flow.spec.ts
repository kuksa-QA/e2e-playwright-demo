import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../../../pages/home-page';
import { CartPage } from '../../../pages/cart-page';
import { CheckOutPage } from '../../../pages/checkout-page';
import { PaymentPage } from '../../../pages/payment-page';
import {PaymentDonePage} from "../../../pages/payment-done-page";
import {LoginPage} from "../../../pages/login-page";
import {stableTestUser} from "../../../fixture/test-data";

test.describe.configure({ mode: 'serial' });

test.describe('Cart → Checkout → Payment flow', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let homePage: HomePage;
    let loginPage: LoginPage;
    let cartPage: CartPage;
    let checkoutPage: CheckOutPage;
    let paymentPage: PaymentPage;
    let paymentDonePage: PaymentDonePage;

    const PRODUCT_NAME = 'Blue Top'
    test.beforeAll(async ({ browser: playwrightBrowser }) => {
        browser = playwrightBrowser;
        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);

        await homePage.navigate();
        loginPage = await homePage.header.goToLoginSignUpPage();

        await loginPage.login(
            stableTestUser.email,
            stableTestUser.password
        );
    });


    test('User can add product to cart from main page', async () => {
        await homePage.productCard(PRODUCT_NAME).locator.hover()
        cartPage = await homePage.addProductToCart(PRODUCT_NAME);

        await expect(cartPage.page).toHaveURL(cartPage.url);
        await expect(cartPage.allProductInfo).toHaveCount(1);
        await expect(cartPage.productNameCell(0)).toHaveText(/Blue Top/);
        await expect(cartPage.proceedToCheckoutButton).toBeVisible();
    });

    test('User can proceed to checkout', async () => {
        checkoutPage = await cartPage.proceedToCheckout();

        await expect(checkoutPage.page).toHaveURL(checkoutPage.url);
        await expect(checkoutPage.productNameCell(0)).toHaveText(/Blue Top/)
        await expect(checkoutPage.orderSummary).toBeVisible();
        await expect(checkoutPage.proceedButton).toBeVisible();
    });

    test('User can complete payment successfully', async () => {
        paymentPage = await checkoutPage.goToPaymentPage();
        await paymentPage.fillPaymentData('Test User', 4111111111111111, 124, 12, 29);
        paymentDonePage = await paymentPage.pay();

        await expect(paymentDonePage.page).toHaveURL(paymentDonePage.url);
        await expect(paymentDonePage.orderPlacedTitle).toBeVisible();
        await expect(paymentDonePage.orderPlacedTitle).toHaveText('Order Placed!')
        await expect(paymentDonePage.invoiceButton).toBeVisible()
    });

    test('User can download invoice', async () => {
        const DOWNLOAD_PROMISE = paymentDonePage.page.waitForEvent('download')
        await paymentDonePage.invoiceButton.click()
        const DOWNLOAD = await DOWNLOAD_PROMISE
        const FILE_NAME = DOWNLOAD.suggestedFilename()

        expect(DOWNLOAD, 'Download started').toBeTruthy()
        expect(DOWNLOAD, 'File in file system').toBeTruthy()
        expect(FILE_NAME).toMatch(/invoice/)

    })

    test('User can return to home page', async () => {
        homePage = await paymentDonePage.goToHomePage()

        await expect(homePage.page).toHaveURL(homePage.url);
    })

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
});
