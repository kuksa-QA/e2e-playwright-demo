import { Locator, Page } from '@playwright/test';

import { BasePage } from './base-page';
import { PaymentPage } from './payment-page';
import { Header } from './components/header';

export class CheckOutPage extends BasePage{
    override url = 'https://automationexercise.com/checkout'

    constructor(page: Page) {
        super(page);
    }

    header = new Header(this.page);

    orderSummary = this.page.getByRole('row', { name: 'Total Amount Rs.' }).getByRole('paragraph');
    productTable = this.page.locator('//table');
    allProductInfo =  this.productTable.locator('//tbody').locator('//tr');
    productInfo = (index: number): Locator => this.productTable.locator('//tbody').locator('//tr').nth(index);
    productNameCell = (index: number): Locator => this.productInfo(index).locator('//td').nth(1);
    proceedButton = this.page.locator('a[href="/payment"]')

    deliveryAddressTable = this.page.locator('ul[id="address_delivery"]');
    deliveryAddressTableTitle = this.deliveryAddressTable.locator('.address_title');
    deliveryAddressTableName = this.deliveryAddressTable.locator('.address_firstname');
    deliveryAddressTableStreet = this.deliveryAddressTable.locator('.address_address1').nth(1);
    deliveryAddressTableCity = this.deliveryAddressTable.locator('.address_city');
    deliveryAddressTableCountry = this.deliveryAddressTable.locator('.address_country_name');
    deliveryAddressTablePhone = this.deliveryAddressTable.locator('.address_phone');

    billingAddressTable = this.page.locator('ul[id="address_invoice"]');
    billingAddressTableTitle = this.billingAddressTable.locator('.address_title');
    billingAddressTableName = this.billingAddressTable.locator('.address_firstname');
    billingAddressTableStreet = this.billingAddressTable.locator('.address_address1').nth(1);
    billingAddressTableCity = this.billingAddressTable.locator('.address_city');
    billingAddressTableCountry = this.billingAddressTable.locator('.address_country_name');
    billingAddressTablePhone = this.billingAddressTable.locator('.address_phone');

    form = this.page.locator('.form-group').first();
    formHeader = this.form.locator('label')
    formPlace = this.form.locator('.form-control');
    placeOrderButton = this.page.locator('a[href="/payment"]');

    async goToPaymentPage(): Promise<PaymentPage> {
        await this.proceedButton.click()

        return new PaymentPage(this.page)
    }
}