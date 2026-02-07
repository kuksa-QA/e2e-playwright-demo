import { Locator, Page } from '@playwright/test';

import { LoginPage } from './login-page';
import { AccountDeletePage } from './account-delete-page';

export class BasePage {
    readonly page: Page;
    readonly url: string | RegExp;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://automationexercise.com/'
    }

    async navigate(path: string = '/') {
        await this.page.goto(path);
    }
}
