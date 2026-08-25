import { expect, test } from '../../fixtures/pages';

test.describe.configure({ mode: 'parallel' });

test.describe('Home page', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    })

    test('Header UI', async ({ homePage }) => {
        await expect(homePage.header.homeButton).toHaveCSS('color', 'rgb(255, 165, 0)')
    })

    test('Carousel change', async ({ homePage }) => {
        await homePage.pauseCarousel();

        await expect.soft(homePage.carouselIndicator(0)).toHaveClass(/active/);
        await homePage.carouselNextButton.click();
        await expect.soft(homePage.carouselIndicator(1)).toHaveClass(/active/);
        await homePage.carouselNextButton.click();
        await expect.soft(homePage.carouselIndicator(2)).toHaveClass(/active/);
        await homePage.carouselPrevButton.click();
        await expect(homePage.carouselIndicator(1)).toHaveClass(/active/);
    })

    test('Scroll Up button appears after scroll', async ({ homePage }) => {
        await expect(homePage.scrollUpButton).toBeAttached();
 
        await homePage.page.mouse.wheel(0, 2000);
        await expect(homePage.scrollUpButton).toBeVisible();
    })

    test('Scroll Up button scrolls up', async ({ homePage }) => {
        await expect(homePage.scrollUpButton).toBeAttached();
 
        await homePage.page.mouse.wheel(0, 2000);
        await expect(homePage.scrollUpButton).toBeVisible();
 
        await homePage.scrollUpButton.click();
 
        await expect(homePage.scrollUpButton).toBeHidden();
        await expect.poll(() => homePage.page.evaluate(() => window.scrollY)).toBe(0);
    })
})