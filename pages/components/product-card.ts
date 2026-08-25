import { Locator, Page } from '@playwright/test';

export class ProductCard {
    readonly locator: Locator;

    constructor(parent: Page, name: string) {
        this.locator = parent.locator('.single-products').filter({ hasText: name }).first();
    }

    get addToCartButton(): Locator {
        return this.locator.locator('.productinfo a.add-to-cart');
    }
}