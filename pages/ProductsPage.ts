import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    // Add buttons
    readonly backpackAddButton: Locator;
    readonly bikeLightAddButton: Locator;

    // Remove buttons
    readonly backpackRemoveButton: Locator;
    readonly bikeLightRemoveButton: Locator;

    // Cart
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.backpackAddButton =
            page.locator('#add-to-cart-sauce-labs-backpack');

        this.bikeLightAddButton =
            page.locator('#add-to-cart-sauce-labs-bike-light');

        this.backpackRemoveButton =
            page.locator('#remove-sauce-labs-backpack');

        this.bikeLightRemoveButton =
            page.locator('#remove-sauce-labs-bike-light');

        this.cartLink =
            page.locator('.shopping_cart_link');
    }


    // =====================================
    // ADD PRODUCTS
    // =====================================

    async addBackpack() {
        await this.backpackAddButton.click();
    }

    async addBikeLight() {
        await this.bikeLightAddButton.click();
    }


    // =====================================
    // DATA DRIVEN ADD PRODUCT
    // =====================================

    async addProduct(product: string) {

        if (product === 'backpack') {

            await this.backpackAddButton.click();

        } else if (product === 'bikeLight') {

            await this.bikeLightAddButton.click();
        }
    }


    // =====================================
    // REMOVE PRODUCTS
    // =====================================

    async removeBackpack() {
        await this.backpackRemoveButton.click();
    }

    async removeBikeLight() {
        await this.bikeLightRemoveButton.click();
    }


    // =====================================
    // CART
    // =====================================

    async openCart() {
        await this.cartLink.click();
    }
}