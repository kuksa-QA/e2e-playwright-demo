import { expect, test } from '../../fixtures/pages';
import { AUTH_FILE } from '../../fixtures/auth';
import { stableTestUser } from '../../fixtures/test-data';
import { CheckOutPage } from '../../pages/checkout-page';
 
test.use({ storageState: AUTH_FILE });

test.describe('Checkout page', () => {
    let checkoutPage: CheckOutPage;

    test.beforeEach(async ({ cartWithProduct }) => {
        checkoutPage = await cartWithProduct.proceedToCheckout();
    })

    test('Header UI', async () => {
        await expect(checkoutPage.header.cartButton).toHaveCSS('color', 'rgb(255, 165, 0)');
    })

    test('Address Details section is seen', async () => {
        await expect.soft(checkoutPage.deliveryAddressTable).toBeVisible();
        await expect.soft(checkoutPage.deliveryAddressTableTitle).toHaveText('Your delivery address');
        await expect.soft(checkoutPage.deliveryAddressTableName).toHaveText(`. ${stableTestUser.first_name} ${stableTestUser.last_name}`);
        await expect.soft(checkoutPage.deliveryAddressTableStreet).toHaveText(`${stableTestUser.address}`);
        await expect.soft(checkoutPage.deliveryAddressTableCity).toHaveText(`${stableTestUser.city} ${stableTestUser.state} ${stableTestUser.zipcode}`);
        await expect.soft(checkoutPage.deliveryAddressTableCountry).toHaveText(`${stableTestUser.country}`);
        await expect.soft(checkoutPage.deliveryAddressTablePhone).toHaveText(`${stableTestUser.phone_number}`);

        await expect.soft(checkoutPage.billingAddressTable).toBeVisible();
        await expect.soft(checkoutPage.billingAddressTableTitle).toHaveText('Your billing address');
        await expect.soft(checkoutPage.billingAddressTableName).toHaveText(`. ${stableTestUser.first_name} ${stableTestUser.last_name}`);
        await expect.soft(checkoutPage.billingAddressTableStreet).toHaveText(`${stableTestUser.address}`);
        await expect.soft(checkoutPage.billingAddressTableCity).toHaveText(`${stableTestUser.city} ${stableTestUser.state} ${stableTestUser.zipcode}`);
        await expect.soft(checkoutPage.billingAddressTableCountry).toHaveText(`${stableTestUser.country}`);
        await expect(checkoutPage.billingAddressTablePhone).toHaveText(`${stableTestUser.phone_number}`);
    })

    test('Comment session is seen and empty', async () => {
        await expect.soft(checkoutPage.form).toBeVisible()
        await expect.soft(checkoutPage.formHeader).toHaveText('If you would like to add a comment about your order, please write it in the field below.')
        await expect.soft(checkoutPage.formPlace).toBeEmpty()
        await expect(checkoutPage.placeOrderButton).toBeEnabled()
    })
});