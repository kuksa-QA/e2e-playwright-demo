import { Page} from '@playwright/test';

import { BasePage } from './base-page';
import { HomePage } from './home-page';
import { AccountCreatePage } from './account-create-page';
import { Header } from './components/header';

export class LoginPage extends BasePage {
    override url = 'https://automationexercise.com/login';
    constructor(page: Page) {
        super(page);
    }

    header = new Header(this.page)

    loginForm = this.page.locator('.login-form');
    loginFormHeader = this.loginForm.locator('h2');
    loginEmailInput = this.loginForm.locator('input[data-qa="login-email"]');
    passwordInput = this.loginForm.locator('input[data-qa="login-password"]');
    formLoginButton =  this.loginForm.locator('button[data-qa="login-button"]');

    signUpForm  = this.page.locator('.signup-form');
    signUpFormHeader  = this.signUpForm.locator('h2');
    nameInput = this.signUpForm.locator('input[data-qa="signup-name"]');
    signUpEmailInput = this.signUpForm.locator('input[data-qa="signup-email"]');
    signUpButton = this.signUpForm.locator('button[data-qa="signup-button"]');

    async login(email: string, password: string): Promise<HomePage> {
        await this.loginEmailInput.pressSequentially(email);
        await this.passwordInput.pressSequentially(password);
        await this.formLoginButton.click();

        return new HomePage(this.page);
    }

    async signUp(name: string, email: string): Promise<AccountCreatePage> {
        await this.nameInput.pressSequentially(name);
        await this.signUpEmailInput.pressSequentially(email);
        await this.signUpButton.click();

        return new AccountCreatePage(this.page);
    }
}