import { CART_PRODUCT, expect, test } from '../../fixtures/pages';
 
test.describe('Cart page', () => {
    test('Header UI', async ({ cartWithProduct }) => {
        await expect(cartWithProduct.header.cartButton).toHaveCSS('color', 'rgb(255, 165, 0)');
    })
 
    test('Products table is seen in cart', async ({ cartWithProduct }) => {
        await expect.soft(cartWithProduct.productTable).toBeVisible();
        await expect.soft(cartWithProduct.proceedToCheckoutButton).toBeVisible();
        await expect.soft(cartWithProduct.allProductInfo).toHaveCount(1);
        await expect(cartWithProduct.productNameCell(0)).toHaveText(new RegExp(CART_PRODUCT));
    })
 
    test('Product table UI', async ({ cartWithProduct }) => {
        await expect.soft(cartWithProduct.tableHeader).toHaveCSS('background-color', 'rgb(254, 152, 15)');
        await expect.soft(cartWithProduct.tableHeader).toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect(cartWithProduct.productPriceCellText(0)).toHaveCSS('color', 'rgb(254, 152, 15)');
    })
 
    test('Delete button UI', async ({ cartWithProduct }) => {
        await expect.soft(cartWithProduct.productDeleteButton(0)).toHaveCSS('background-color', 'rgb(240, 240, 233)');
        await cartWithProduct.productDeleteButton(0).hover()
        await expect(cartWithProduct.productDeleteButton(0)).toHaveCSS('background-color', 'rgb(254, 152, 15)');
    })
 
    test('Delete button in clickable', async ({ cartWithProduct }) => {
        await cartWithProduct.productDeleteButton(0).click()
        await expect.soft(cartWithProduct.proceedToCheckoutButton).toBeHidden();
        await expect(cartWithProduct.productNameCell(0)).toBeHidden();
    })
})