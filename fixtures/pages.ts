import { test as base } from '@playwright/test';
 
import { HomePage } from '../pages/home-page';
import { CartPage } from '../pages/cart-page';
import { blockThirdPartyNoise } from './network';
 
export const CART_PRODUCT = 'Blue Top';
 
type PageObjects = {
    homePage: HomePage;
    cartWithProduct: CartPage;
};
 
export const test = base.extend<PageObjects>({
    page: async ({ page }, use) => {
        await blockThirdPartyNoise(page);
        await use(page);
    },
 
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
 
    cartWithProduct: async ({ homePage }, use) => {
        await homePage.navigate();
        await use(await homePage.addProductToCart(CART_PRODUCT));
    },
});
 
export { expect } from '@playwright/test';