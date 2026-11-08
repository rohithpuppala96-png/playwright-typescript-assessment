import { Then } from "@cucumber/cucumber";
import { CartPage } from "../pages/CartPage";
import { CustomWorld } from "../support/world";

Then(
  "the cart contains each product with the quantity added",
  async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.verifyNumberOfItems(this.currentData.cartItems.length);
    for (const { productName, quantity } of this.currentData.cartItems) {
      await cartPage.verifyItemQuantity(productName, quantity);
    }
  },
);

Then(
  "each product's unit price matches the price shown in the shop",
  async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    for (const { productName } of this.currentData.cartItems) {
      await cartPage.verifyItemPrice(
        productName,
        this.capturedPrices[productName],
      );
    }
  },
);

Then(
  "each product's subtotal equals unit price times quantity",
  async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    for (const { productName } of this.currentData.cartItems) {
      await cartPage.verifyItemSubtotal(productName);
    }
  },
);

Then(
  "the total equals the sum of all subtotals",
  async function (this: CustomWorld) {
    await new CartPage(this.page).verifyTotal();
  },
);
