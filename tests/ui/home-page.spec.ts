import {expect, test} from '@playwright/test';

import { HomePage } from '../../pages/home-page';

test.describe.configure({ mode: 'parallel' });

test.describe('Home page', () => {
    let homePage: HomePage;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        await homePage.navigate()
    })

    test('Header UI', async () => {
        await expect(homePage.header.homeButton).toHaveCSS('color', 'rgb(255, 165, 0)')
    })

    test('Carousel change', async () => {
        await expect.soft(homePage.carouselIndicator(0)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
        await homePage.carouselNextButton.click();
        await expect.soft(homePage.carouselIndicator(1)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
        await homePage.carouselNextButton.click();
        await expect.soft(homePage.carouselIndicator(2)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
        await homePage.carouselPrevButton.click();
        await expect(homePage.carouselIndicator(1)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
    })

    test('Scroll Up button appears after scroll', async () => {
        await homePage.page.mouse.wheel(0, 2000)
        await expect(homePage.scrollUpButton).toBeVisible()
    })

    test('Scroll Up button scrolls up', async () => {
        const START_POSITION = await homePage.page.locator('header').boundingBox()
        await homePage.page.mouse.wheel(0, 2000)
        await homePage.scrollUpButton.click({force: true})
        await expect(homePage.scrollUpButton).toBeHidden()
        expect(await homePage.page.locator('header').boundingBox()).toEqual(START_POSITION)
    })
})