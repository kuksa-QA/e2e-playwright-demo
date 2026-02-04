import {Locator, Page} from '@playwright/test';
import { BasePage } from './base-page';
import { HomePage } from './home-page';

export class LoginPage extends BasePage {
    loginEmailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    nameInput: Locator;
    signUpEmailInput: Locator;
    signUpButton: Locator;

    constructor(page: Page) {
        super(page);

        this.loginEmailInput = this.page.locator('input[data-qa="login-email"]');
        this.passwordInput = this.page.locator('input[data-qa="login-password"]');
        this.loginButton =  this.page.locator('button[data-qa="login-button"]');

        this.nameInput = this.page.locator('input[data-qa="signup-name"]');
        this.signUpEmailInput = this.page.locator('input[data-qa="signup-email"]');
        this.signUpButton = this.page.locator('button[data-qa="signup-button"]');

    }

    async login(email: string, password: string): Promise<HomePage> {
        await this.loginEmailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new HomePage(this.page);
    }

    async signUp(name: string, email: string): Promise<HomePage> {
        await this.nameInput.fill(name);
        await this.signUpEmailInput.fill(email);
        await this.signUpButton.click();

        return new HomePage(this.page);
    }
}