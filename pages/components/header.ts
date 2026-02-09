import { Locator, Page } from '@playwright/test';
import { LoginPage } from '../login-page';
import { AccountDeletePage } from '../account-delete-page';

export class Header {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('header');
    }

    get loginButton(): Locator {
        return this.root.locator('a[href="/login"]');
    }

    get logoutButton(): Locator {
        return this.root.locator('a[href="/logout"]');
    }

    get deleteAccountButton(): Locator {
        return this.root.locator('a[href="/delete_account"]');
    }

    get homeButton(): Locator {
        return this.root.locator('a[href="/"]').last();
    }

    get cartButton(): Locator {
        return this.root.locator('a[href="/view_cart"]');
    }

    async goToLoginSignUpPage(): Promise<LoginPage> {
        await this.loginButton.click();
        return new LoginPage(this.page);
    }

    async deleteAccount(): Promise<AccountDeletePage> {
        await this.deleteAccountButton.click();
        return new AccountDeletePage(this.page);
    }
}
