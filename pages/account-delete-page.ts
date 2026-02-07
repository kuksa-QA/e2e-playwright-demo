import { Page } from '@playwright/test';

import { BasePage } from './base-page';
import { HomePage } from './home-page';

export class AccountDeletePage extends BasePage{
    override url = 'https://automationexercise.com/delete_account'

    constructor(page: Page) {
        super(page);
    }

    continueButton = this.page.locator('a[data-qa="continue-button"]')

    async goToHomePage(): Promise<HomePage> {
        await this.continueButton.click();

        return new HomePage(this.page);
    }
}