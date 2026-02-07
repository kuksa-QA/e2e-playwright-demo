import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';

test.describe.configure({ mode: 'parallel' });

test.describe('Login page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    test.beforeEach( async ({page}) => {
        homePage =  new HomePage(page)
        await homePage.navigate()
        loginPage = await homePage.header.goToLoginSignUpPage()

    })

    test('Header UI', async () => {
        await expect(loginPage.header.loginButton).toHaveCSS('color', 'rgb(255, 165, 0)')
    })

    test('Login form', async () => {
        await expect.soft(loginPage.loginFormHeader).toHaveText('Login to your account')
        await expect.soft(loginPage.loginEmailInput).toHaveValue('')
        await expect.soft(loginPage.loginEmailInput).toHaveAttribute('placeholder', 'Email Address')
        await expect.soft(loginPage.loginEmailInput).toHaveAttribute('required', '')
        await expect.soft(loginPage.passwordInput).toHaveValue('')
        await expect.soft(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password')
        await expect.soft(loginPage.passwordInput).toHaveAttribute('required', '')
        await expect.soft(loginPage.formLoginButton).toHaveText('Login')
        await expect.soft(loginPage.formLoginButton).toHaveCSS('background-color' , 'rgb(254, 152, 15)')
        await expect(loginPage.formLoginButton).toHaveCSS('color' , 'rgb(255, 255, 255)')
    })

    test('Sign Up form', async () => {
        await expect.soft(loginPage.signUpFormHeader).toHaveText('New User Signup!')
        await expect.soft(loginPage.nameInput).toHaveValue('')
        await expect.soft(loginPage.nameInput).toHaveAttribute('placeholder', 'Name')
        await expect.soft(loginPage.nameInput).toHaveAttribute('required', '')
        await expect.soft(loginPage.signUpEmailInput).toHaveValue('')
        await expect.soft(loginPage.signUpEmailInput).toHaveAttribute('placeholder', 'Email Address')
        await expect.soft(loginPage.signUpEmailInput).toHaveAttribute('required', '')
        await expect.soft(loginPage.signUpButton).toHaveText('Signup')
        await expect.soft(loginPage.signUpButton).toHaveCSS('background-color' , 'rgb(254, 152, 15)')
        await expect(loginPage.signUpButton).toHaveCSS('color' , 'rgb(255, 255, 255)')
    })
})