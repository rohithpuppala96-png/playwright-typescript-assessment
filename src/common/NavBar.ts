import { Page } from "@playwright/test";
import { expect } from "../support/assert";

export class NavBar {
  private readonly Elements = {
    shopLink: "#nav-shop a",
    contactLink: "#nav-contact a",
    cartLink: "#nav-cart a",
    cartCount: "#nav-cart .cart-count",
  };

  constructor(private readonly page: Page) {}

  async goToShop() {
    await this.page.locator(this.Elements.shopLink).click();
  }

  async goToContact() {
    await this.page.locator(this.Elements.contactLink).click();
  }

  async goToCart() {
    await this.page.locator(this.Elements.cartLink).click();
  }

  async verifyCartCount(count: number) {
    await expect(this.page.locator(this.Elements.cartCount)).toHaveText(
      String(count),
    );
  }
}
