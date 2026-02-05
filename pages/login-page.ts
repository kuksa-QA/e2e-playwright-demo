import { Page} from '@playwright/test';
import { BasePage } from './base-page';
import { HomePage } from './home-page';
import {AccountCreatePage} from "./account-create-page";

export class LoginPage extends BasePage {
    override url = 'https://automationexercise.com/login';
    constructor(page: Page) {
        super(page);
    }

    loginEmailInput = this.page.locator('input[data-qa="login-email"]');
    passwordInput = this.page.locator('input[data-qa="login-password"]');
    loginButton =  this.page.locator('button[data-qa="login-button"]');

    nameInput = this.page.locator('input[data-qa="signup-name"]');
    signUpEmailInput = this.page.locator('input[data-qa="signup-email"]');
    signUpButton = this.page.locator('button[data-qa="signup-button"]');

    async login(email: string, password: string): Promise<HomePage> {
        await this.loginEmailInput.pressSequentially(email);
        await this.passwordInput.pressSequentially(password);
        await this.loginButton.click();

        return new HomePage(this.page);
    }

    async signUp(name: string, email: string): Promise<AccountCreatePage> {
        await this.nameInput.pressSequentially(name);
        await this.signUpEmailInput.pressSequentially(email);
        await this.signUpButton.click();

        return new AccountCreatePage(this.page);
    }
}