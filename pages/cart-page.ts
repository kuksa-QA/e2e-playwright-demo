import { Locator, Page } from '@playwright/test';

import { CheckOutPage } from './checkout-page';
import { BasePage } from './base-page';
import { Header } from './components/header';


export class CartPage extends BasePage {
    override url = 'https://automationexercise.com/view_cart'
    constructor(page: Page) {
        super(page);
    }

    header = new Header(this.page);
    productTable = this.page.locator('//table')
    tableHeader = this.productTable.locator('.cart_menu')
    allProductInfo =  this.productTable.locator('//tbody').locator('//tr')
    productInfo = (index: number): Locator => this.productTable.locator('//tbody').locator('//tr').nth(index)
    productNameCell = (index: number): Locator => this.productInfo(index).locator('//td').nth(1)
    productPriceCellText = (index: number): Locator => this.productInfo(index).locator('//td').nth(4).locator('.cart_total_price')
    productDeleteButton = (index: number): Locator => this.productInfo(index).locator('.cart_quantity_delete')
    proceedToCheckoutButton = this.page.locator('//a[contains(@class, "btn btn-default check_out")]')

    async proceedToCheckout(): Promise<CheckOutPage> {
        await this.proceedToCheckoutButton.click();
        return new CheckOutPage(this.page);
    }
}