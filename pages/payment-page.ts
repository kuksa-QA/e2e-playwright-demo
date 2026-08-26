import { Page } from '@playwright/test';

import { BasePage } from './base-page';
import { PaymentDonePage } from './payment-done-page';

export class PaymentPage extends BasePage{
    override url = 'https://automationexercise.com/payment'

    constructor(page: Page) {
        super(page);
    }

    nameInput = this.page.locator('input[data-qa="name-on-card"]');
    cardNumberInput = this.page.locator('input[data-qa="card-number"]');
    cvcInput = this.page.locator('input[data-qa="cvc"]');
    expiryMonthInput = this.page.locator('input[data-qa="expiry-month"]');
    expiryYearInput = this.page.locator('input[data-qa="expiry-year"]');

    confirmButton = this.page.locator('button[data-qa="pay-button"]');

    async fillPaymentData(name: string, cardNumber: number, cvc: number, month: number, year: number): Promise<void> {
        await this.nameInput.fill(name);
        await this.cardNumberInput.fill(cardNumber.toString());
        await this.cvcInput.fill(cvc.toString());
        await this.expiryMonthInput.fill(month.toString());
        await this.expiryYearInput.fill(year.toString());
    }

    async pay(): Promise<PaymentDonePage> {
        await this.confirmButton.click()

        return new PaymentDonePage(this.page);
    }
}