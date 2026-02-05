import {Locator, Page} from '@playwright/test';
import { BasePage } from './base-page';
import {AccountDeletePage} from "./account-delete-page";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    loginButton = this.page.locator('a[href="/login"]')
    logoutButton = this.page.locator('a[href="/logout"]')
    deleteAccountButton = this.page.locator('a[href="/delete_account"]')

    async deleteAccount(): Promise<AccountDeletePage> {
        await this.deleteAccountButton.click();
        return new AccountDeletePage(this.page);
    }
}
