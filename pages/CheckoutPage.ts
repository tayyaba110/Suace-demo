import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;

    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;

    readonly successMessage: Locator;

    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput =
            page.locator('#first-name');

        this.lastNameInput =
            page.locator('#last-name');

        this.postalCodeInput =
            page.locator('#postal-code');

        this.continueButton =
            page.locator('#continue');

        this.cancelButton =
            page.locator('#cancel');

        this.finishButton =
            page.locator('#finish');

        this.successMessage =
            page.getByText('Thank you for your order!');
        
        this.errorMessage = 
            page.locator('[data-test="error"]');
    }

    // Fill customer information
    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    // Continue checkout
    async continueCheckout() {
        await this.continueButton.click();
    }

    // Cancel checkout
    async cancelCheckout() {
        await this.cancelButton.click();
    }

    // Finish order
    async finishOrder() {
        await this.finishButton.click();
    }

    // Verify successful order
    async verifyOrderSuccess() {
        await this.successMessage.isVisible();
    }
}