import { Page} from '@playwright/test';
import { BasePage } from './base-page';
import {AccountDeletePage} from "./account-delete-page";
import {ProductCard} from "./components/product-card";
import {CartPage} from "./cart-page";
import {AddToCartModal} from "./components/add-to-cart-modal";
import {LoginPage} from "./login-page";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    productCard = (name: string): ProductCard => new ProductCard(this.page, name);
    addToCartModal = new AddToCartModal(this.page);

    loginButton = this.page.locator('a[href="/login"]')
    logoutButton = this.page.locator('a[href="/logout"]')
    deleteAccountButton = this.page.locator('a[href="/delete_account"]')

    async goToLoginSignUpPage(): Promise<LoginPage> {
        await this.loginButton.click();

        return new LoginPage(this.page);
    }
    async deleteAccount(): Promise<AccountDeletePage> {
        await this.deleteAccountButton.click();
        return new AccountDeletePage(this.page);
    }

    async addProductToCart(name: string): Promise<CartPage> {
        await this.productCard(name).addToCartButton.click();
        await this.addToCartModal.goToCartButton.click();
        return new CartPage(this.page)
    }
}
