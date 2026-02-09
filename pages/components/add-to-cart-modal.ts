import { Locator, Page } from '@playwright/test';

export class AddToCartModal {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('.modal-content');
    }

    get goToCartButton() {
        return this.root.locator('a[href="/view_cart"]')
    }
}