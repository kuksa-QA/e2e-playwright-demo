import {Locator, Page} from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
    loginButton: Locator
    logoutButton: Locator

    constructor(page: Page) {
        super(page);

        this.loginButton = this.page.locator('a[href="/login"]')
        this.logoutButton = this.page.locator('a[href="/logout"]')
    }
}
