import { expect, test } from '@playwright/test';

import { HomePage } from '../../pages/home-page';
import { CartPage } from '../../pages/cart-page';

test.describe('Cart page', () => {
    let homePage: HomePage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        cartPage = await homePage.addProductToCart('Blue Top');
    })

    test('Header UI', async () => {
        await expect(cartPage.header.cartButton).toHaveCSS('color', 'rgb(255, 165, 0)');
    })

    test('Products table is seen in cart', async () => {
        await expect.soft(cartPage.productTable).toBeVisible();
        await expect.soft(cartPage.proceedToCheckoutButton).toBeVisible();
        await expect.soft(cartPage.allProductInfo).toHaveCount(1);
        await expect(cartPage.productNameCell(0)).toHaveText(/Blue Top/);
    })

    test('Product table UI', async () => {
        await expect.soft(cartPage.tableHeader).toHaveCSS('background-color', 'rgb(254, 152, 15)');
        await expect.soft(cartPage.tableHeader).toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect(cartPage.productPriceCellText(0)).toHaveCSS('color', 'rgb(254, 152, 15)');
    })

    test('Delete button UI', async () => {
        await expect.soft(cartPage.productDeleteButton(0)).toHaveCSS('background-color', 'rgb(240, 240, 233)');
        await cartPage.productDeleteButton(0).hover()
        await expect(cartPage.productDeleteButton(0)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
    })

    test('Delete button in clickable', async () => {
        await cartPage.productDeleteButton(0).click()
        await expect.soft(cartPage.proceedToCheckoutButton).toBeHidden();
        await expect(cartPage.productNameCell(0)).toBeHidden();
    })
})