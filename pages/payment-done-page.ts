import { Page } from '@playwright/test';

import { BasePage } from './base-page';
import { HomePage } from './home-page';

export class PaymentDonePage extends BasePage {
    override url = new RegExp('https://automationexercise.com/payment_done')

    constructor(page: Page) {
        super(page);
    }

    orderPlacedTitle = this.page.locator('h2[data-qa="order-placed"]');
    invoiceButton = this.page.getByRole('link').filter({hasText: 'Download Invoice'});
    continueButton = this.page.locator('a[data-qa="continue-button"]');

    async goToHomePage(): Promise<HomePage> {
        await this.continueButton.click()
        return new HomePage(this.page);
    }
}