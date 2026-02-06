import {BasePage} from "./base-page";
import {Page} from "@playwright/test";
import {PaymentDonePage} from "./payment-done-page";

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
        await this.nameInput.pressSequentially(name);
        await this.cardNumberInput.pressSequentially(cardNumber.toString());
        await this.cvcInput.pressSequentially(cvc.toString());
        await this.expiryMonthInput.pressSequentially(month.toString());
        await this.expiryYearInput.pressSequentially(year.toString());
    }

    async pay(): Promise<PaymentDonePage> {
        await this.confirmButton.click()

        return new PaymentDonePage(this.page);
    }
}