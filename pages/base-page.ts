import { Page } from '@playwright/test';

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
