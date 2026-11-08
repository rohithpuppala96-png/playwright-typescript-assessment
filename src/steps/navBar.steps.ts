import { Then, When } from "@cucumber/cucumber";
import { NavBar } from "../common/NavBar";
import { CartPage } from "../pages/CartPage";
import { ContactPage } from "../pages/ContactPage";
import { ShopPage } from "../pages/ShopPage";
import { CustomWorld } from "../support/world";

When(
  "the user navigates to the contact page",
  async function (this: CustomWorld) {
    await new NavBar(this.page).goToContact();
    await new ContactPage(this.page).verifyPageLoaded();
  },
);

When("the user navigates to the shop page", async function (this: CustomWorld) {
  await new NavBar(this.page).goToShop();
  await new ShopPage(this.page).verifyPageLoaded();
});

When("the user navigates to the cart page", async function (this: CustomWorld) {
  await new NavBar(this.page).goToCart();
  await new CartPage(this.page).verifyPageLoaded();
});

Then(
  "the cart count shows the total quantity added",
  async function (this: CustomWorld) {
    let totalQuantity = 0;
    for (const item of this.currentData.cartItems) {
      totalQuantity += item.quantity;
    }
    await new NavBar(this.page).verifyCartCount(totalQuantity);
  },
);
