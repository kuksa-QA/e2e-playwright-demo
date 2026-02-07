import { Locator, Page } from '@playwright/test';

import { CheckOutPage } from './checkout-page';
import { BasePage } from './base-page';


export class CartPage extends BasePage {
    override url = 'https://automationexercise.com/view_cart'
    constructor(page: Page) {
        super(page);
    }

    productTable = this.page.locator('//table')
    allProductInfo =  this.productTable.locator('//tbody').locator('//tr')
    productInfo = (index: number): Locator => this.productTable.locator('//tbody').locator('//tr').nth(index)
    productNameCell = (index: number): Locator => this.productInfo(index).locator('//td').nth(1)

    proceedToCheckoutButton = this.page.locator('//a[contains(@class, "btn btn-default check_out")]')

    async proceedToCheckout(): Promise<CheckOutPage> {
        await this.proceedToCheckoutButton.click();
        return new CheckOutPage(this.page);
    }
}