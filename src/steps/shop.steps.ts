import { When } from "@cucumber/cucumber";
import { ShopPage } from "../pages/ShopPage";
import { CustomWorld } from "../support/world";

When(
  "the user adds the required products to the cart",
  async function (this: CustomWorld) {
    const shopPage = new ShopPage(this.page);
    for (const { productName, quantity } of this.currentData.cartItems) {
      this.capturedPrices[productName] =
        await shopPage.getProductPrice(productName);
      for (let i = 0; i < quantity; i++) {
        await shopPage.clickBuy(productName);
      }
    }
  },
);
