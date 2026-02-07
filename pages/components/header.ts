import { Locator, Page } from '@playwright/test';
import { LoginPage } from '../login-page';
import { AccountDeletePage } from '../account-delete-page';

export class Header {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('header'); //
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

    get productsButton(): Locator {
        return this.root.locator('a[href="/products"]');
    }

    get cartButton(): Locator {
        return this.root.locator('a[href="/view_cart"]');
    }

    get testCasesButton(): Locator {
        return this.root.locator('a[href="/test-cases"]');
    }

    get apiTestingButton(): Locator {
        return this.root.locator('a[href="/api_list"]');
    }

    get videoTutorialButton(): Locator {
        return this.root.locator(
            'a[href="https://www.youtube.com/c/AutomationExercise"]'
        );
    }

    get contactUsButton(): Locator {
        return this.root.locator('a[href="/contact_us"]');
    }

    get logo(): Locator {
        return this.root.locator('img[src="/static/images/home/logo.png"]');
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
