import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    // Products
    readonly backpack: Locator;
    readonly bikeLight: Locator;

    // Remove buttons
    readonly removeBackpackButton: Locator;
    readonly removeBikeLightButton: Locator;

    // Cart buttons
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.backpack =
            page.getByText('Sauce Labs Backpack');

        this.bikeLight =
            page.getByText('Sauce Labs Bike Light');

        this.removeBackpackButton =
            page.locator('#remove-sauce-labs-backpack');

        this.removeBikeLightButton =
            page.locator('#remove-sauce-labs-bike-light');

        this.continueShoppingButton =
            page.locator('#continue-shopping');

        this.checkoutButton =
            page.locator('#checkout');
    }

    // Remove Backpack from Cart
    async removeBackpack() {
        await this.removeBackpackButton.click();
    }

    // Remove Bike Light from Cart
    async removeBikeLight() {
        await this.removeBikeLightButton.click();
    }

    // Continue Shopping
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    // Checkout
    async checkout() {
        await this.checkoutButton.click();
    }
}