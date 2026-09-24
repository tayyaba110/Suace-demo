import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { loginData } from '../test-data/loginData';
import { checkoutData } from '../test-data/checkoutData';


// =====================================
// PRODUCT DDT DATA
// =====================================

const productData = [
    {
        product: 'backpack',
        expectedProduct: 'Sauce Labs Backpack'
    },
    {
        product: 'bikeLight',
        expectedProduct: 'Sauce Labs Bike Light'
    }
];


// =====================================
// SAUCEDEMO POM TESTS
// =====================================

test.describe('SauceDemo POM Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(page).toHaveURL(/inventory.html/);
    });


    // 1. Add Backpack
    test('Add Backpack to Cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await expect(cartPage.backpack).toBeVisible();
    });


    // 2. Add Bike Light
    test('Add Bike Light to Cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBikeLight();
        await productsPage.openCart();

        await expect(cartPage.bikeLight).toBeVisible();
    });


    // 3. Add Multiple Products
    test('Add Multiple Products', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.addBikeLight();

        await productsPage.openCart();

        await expect(cartPage.backpack).toBeVisible();
        await expect(cartPage.bikeLight).toBeVisible();
    });


    // 4. Remove Backpack from Products Page
    test('Remove Backpack from Products Page', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.removeBackpack();

        await productsPage.openCart();

        await expect(cartPage.backpack).not.toBeVisible();
    });


    // 5. Remove Bike Light from Products Page
    test('Remove Bike Light from Products Page', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBikeLight();
        await productsPage.removeBikeLight();

        await productsPage.openCart();

        await expect(cartPage.bikeLight).not.toBeVisible();
    });


    // 6. Remove Backpack from Cart
    test('Remove Backpack from Cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await expect(cartPage.backpack).toBeVisible();

        await cartPage.removeBackpack();

        await expect(cartPage.backpack).not.toBeVisible();
    });


    // 7. Remove Bike Light from Cart
    test('Remove Bike Light from Cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBikeLight();
        await productsPage.openCart();

        await expect(cartPage.bikeLight).toBeVisible();

        await cartPage.removeBikeLight();

        await expect(cartPage.bikeLight).not.toBeVisible();
    });


    // 8. Remove One Product and Keep Another
    test('Remove One Product and Keep Another', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.addBikeLight();

        await productsPage.openCart();

        await cartPage.removeBackpack();

        await expect(cartPage.backpack).not.toBeVisible();
        await expect(cartPage.bikeLight).toBeVisible();
    });


    // 9. Continue Shopping
    test('Continue Shopping from Cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory.html/);
    });


    // 10. Add Product Again After Removing
    test('Add Product Again After Removing', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.removeBackpack();
        await productsPage.addBackpack();

        await productsPage.openCart();

        await expect(cartPage.backpack).toBeVisible();
    });


    // 11. Open Checkout
    test('Open Checkout', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await cartPage.checkout();

        await expect(page).toHaveURL(/checkout-step-one.html/);
    });


    // 12. Cancel Checkout
    test('Cancel Checkout', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await cartPage.checkout();

        await expect(page).toHaveURL(/checkout-step-one.html/);

        await checkoutPage.cancelCheckout();

        await expect(page).toHaveURL(/cart.html/);
    });


    // 13. Fill Checkout Information
    test('Fill Checkout Information', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await cartPage.checkout();

        await checkoutPage.fillCustomerInformation(
            'Tayyaba',
            'QA',
            '54000'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);
    });


    // 14. Complete Order
    test('Complete Order Successfully', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productsPage.addBackpack();
        await productsPage.openCart();

        await cartPage.checkout();

        await checkoutPage.fillCustomerInformation(
            'Tayyaba',
            'QA',
            '54000'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await checkoutPage.finishOrder();

        await expect(
            checkoutPage.successMessage
        ).toBeVisible();
    });


    // 15. Complete Order with Multiple Products
    test('Complete Order with Multiple Products', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productsPage.addBackpack();
        await productsPage.addBikeLight();

        await productsPage.openCart();

        await expect(cartPage.backpack).toBeVisible();
        await expect(cartPage.bikeLight).toBeVisible();

        await cartPage.checkout();

        await checkoutPage.fillCustomerInformation(
            'Tayyaba',
            'QA',
            '54000'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await checkoutPage.finishOrder();

        await expect(
            checkoutPage.successMessage
        ).toBeVisible();
    });

});


// =====================================
// DATA DRIVEN LOGIN TESTS
// =====================================

test.describe('Data Driven Login Tests', () => {

    test('Login - Standard User', async ({ page }) => {

        const data = loginData[0];
        const loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

        await loginPage.login(
            data.username,
            data.password
        );

        await expect(page).toHaveURL(/inventory.html/);
    });


    test('Login - Locked User', async ({ page }) => {

        const data = loginData[1];
        const loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

        await loginPage.login(
            data.username,
            data.password
        );

        await expect(loginPage.errorMessage)
            .toContainText(
                'Sorry, this user has been locked out'
            );
    });


    test('Login - Invalid Username', async ({ page }) => {

        const data = loginData[2];
        const loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

        await loginPage.login(
            data.username,
            data.password
        );

        await expect(loginPage.errorMessage)
            .toBeVisible();
    });


    test('Login - Invalid Password', async ({ page }) => {

        const data = loginData[3];
        const loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

        await loginPage.login(
            data.username,
            data.password
        );

        await expect(loginPage.errorMessage)
            .toBeVisible();
    });

});


// =====================================
// DATA DRIVEN PRODUCT TESTS
// =====================================

test.describe('Data Driven Product Tests', () => {

    productData.forEach((data) => {

        test(
            `Add Product - ${data.expectedProduct}`,
            async ({ page }) => {

                const loginPage = new LoginPage(page);
                const productsPage = new ProductsPage(page);

                await page.goto('https://www.saucedemo.com/');

                await loginPage.login(
                    'standard_user',
                    'secret_sauce'
                );

                await expect(page).toHaveURL(/inventory.html/);

                if (data.product === 'backpack') {

                    await productsPage.addBackpack();

                } else if (data.product === 'bikeLight') {

                    await productsPage.addBikeLight();

                }

                await productsPage.openCart();

                await expect(
                    page.getByText(data.expectedProduct)
                ).toBeVisible();
            }
        );

    });

});


// =====================================
// ADVANCED DATA DRIVEN LOGIN TESTS
// =====================================

test.describe('Advanced Data Driven Login Tests', () => {

    loginData.forEach((data) => {

        test(
            `Login - ${data.username} - ${data.expectedResult}`,
            async ({ page }) => {

                const loginPage = new LoginPage(page);

                await page.goto('https://www.saucedemo.com/');

                await loginPage.login(
                    data.username,
                    data.password
                );

                if (data.expectedResult === 'success') {

                    await expect(page).toHaveURL(/inventory.html/);

                } else if (data.expectedResult === 'locked') {

                    await expect(loginPage.errorMessage)
                        .toContainText(
                            'Sorry, this user has been locked out'
                        );

                } else if (data.expectedResult === 'error') {

                    await expect(loginPage.errorMessage)
                        .toBeVisible();
                }
            }
        );

    });

});


// =====================================
// ADVANCED DATA DRIVEN CHECKOUT TESTS
// =====================================

test.describe('Advanced Data Driven Checkout Tests', () => {

    checkoutData.forEach((data) => {

        test(
            `Checkout - ${data.firstName || 'Missing'} ${data.lastName || 'Missing'} - ${data.expectedResult}`,
            async ({ page }) => {

                const loginPage = new LoginPage(page);
                const productsPage = new ProductsPage(page);
                const cartPage = new CartPage(page);
                const checkoutPage = new CheckoutPage(page);

                await page.goto('https://www.saucedemo.com/');

                await loginPage.login(
                    'standard_user',
                    'secret_sauce'
                );

                await expect(page).toHaveURL(/inventory.html/);

                await productsPage.addBackpack();

                await productsPage.openCart();

                await cartPage.checkout();

                await checkoutPage.fillCustomerInformation(
                    data.firstName,
                    data.lastName,
                    data.postalCode
                );

                await checkoutPage.continueCheckout();

                if (data.expectedResult === 'success') {

                    await expect(page)
                        .toHaveURL(/checkout-step-two.html/);

                } else if (data.expectedResult === 'error') {

                    await expect(checkoutPage.errorMessage)
                        .toBeVisible();
                }
            }
        );

    });

});

test('Verify Login Page Title', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs');
});