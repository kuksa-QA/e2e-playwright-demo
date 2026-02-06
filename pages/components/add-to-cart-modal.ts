import {Locator, Page} from "@playwright/test";

export class AddToCartModal {
    readonly locator: Locator;

    constructor(parent: Page) {
        this.locator = parent.locator('.modal-content');
    }

    get continueShoppingButton() {
        return this.locator.locator('button');
    }

    get goToCartButton() {
        return this.locator.locator('a[href="/view_cart"]')
    }
}