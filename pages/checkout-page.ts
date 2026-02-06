import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {PaymentPage} from "./payment-page";

export class CheckOutPage extends BasePage{
    override url = 'https://automationexercise.com/checkout'

    constructor(page: Page) {
        super(page);
    }

    orderSummary = this.page.getByRole('row', { name: 'Total Amount Rs.' }).getByRole('paragraph')
    productTable = this.page.locator('//table')
    allProductInfo =  this.productTable.locator('//tbody').locator('//tr')
    productInfo = (index: number): Locator => this.productTable.locator('//tbody').locator('//tr').nth(index)
    productNameCell = (index: number): Locator => this.productInfo(index).locator('//td').nth(1)
    proceedButton = this.page.locator('a[href="/payment"]')

    async goToPaymentPage(): Promise<PaymentPage> {
        await this.proceedButton.click()

        return new PaymentPage(this.page)
    }
}