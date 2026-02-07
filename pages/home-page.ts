import {Locator, Page} from '@playwright/test';
import { BasePage } from './base-page';
import { ProductCard } from './components/product-card';
import { CartPage } from './cart-page';
import { AddToCartModal } from './components/add-to-cart-modal';
import {Header} from "./components/header";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    header = new Header(this.page)
    productCard = (name: string): ProductCard => new ProductCard(this.page, name);
    addToCartModal = new AddToCartModal(this.page);

    bannersCarousel = this.page.locator('.carousel')
    carouselPrevButton = this.bannersCarousel.locator('.left').first();
    carouselNextButton = this.bannersCarousel.locator('.right').first()
    carouselIndicator = (index: number): Locator => this.bannersCarousel.locator('li[data-target="#slider-carousel"]').nth(index)
    scrollUpButton = this.page.locator('a[id="scrollUp"]');

    async addProductToCart(name: string): Promise<CartPage> {
        await this.productCard(name).addToCartButton.click();
        await this.addToCartModal.goToCartButton.click();
        return new CartPage(this.page)
    }
}
