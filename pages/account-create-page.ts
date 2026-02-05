import { BasePage } from './base-page';
import { Page } from '@playwright/test';
import { Country } from '../src/types/country';
import {HomePage} from "./home-page";
import {AccountCreatedPage} from "./account-created-page";

export class AccountCreatePage extends BasePage {
    override url = 'https://automationexercise.com/signup'
    constructor(page: Page) {
        super(page);
    }

    nameInput = this.page.locator('input[data-qa="name"]');
    emailInput = this.page.locator('input[data-qa="email"]');
    passwordInput = this.page.locator('input[data-qa="password"]');
    firstNameInput = this.page.locator('input[data-qa="first_name"]');
    lastNameInput = this.page.locator('input[data-qa="last_name"]');
    addressInput = this.page.locator('input[data-qa="address"]');
    countryDropdown = this.page.locator('select[data-qa="country"]');
    stateInput = this.page.locator('input[data-qa="state"]');
    cityInput = this.page.locator('input[data-qa="city"]');
    zipcodeInput = this.page.locator('input[data-qa="zipcode"]');
    mobileNumberInput = this.page.locator('input[data-qa="mobile_number"]');
    createButton = this.page.locator('button[data-qa="create-account"]');

    async selectCountry(country: Country): Promise<void> {
        await this.countryDropdown.selectOption({ label: country });
    }

    async fillRequiredDetails(
        password: string,
        firstName: string,
        lastName: string,
        address: string,
        country: Country,
        state: string,
        city: string,
        zipcode: string,
        mobileNumber: string
    ): Promise<void> {
        await this.passwordInput.pressSequentially(password);
        await this.firstNameInput.pressSequentially(firstName);
        await this.lastNameInput.pressSequentially(lastName);
        await this.addressInput.pressSequentially(address);
        await this.selectCountry(country);
        await this.stateInput.pressSequentially(state);
        await this.cityInput.pressSequentially(city);
        await this.zipcodeInput.pressSequentially(zipcode);
        await this.mobileNumberInput.pressSequentially(mobileNumber);
    }

    async createAccount(): Promise<AccountCreatedPage> {
        await this.createButton.click();

        return new AccountCreatedPage(this.page);
    }
}
