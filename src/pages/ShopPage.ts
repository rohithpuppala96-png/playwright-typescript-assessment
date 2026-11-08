import { Page } from "@playwright/test";
import { expect } from "../support/assert";
import { LocatorUtil } from "../support/utils/LocatorUtil";
import { PriceUtil } from "../support/utils/PriceUtil";

export class ShopPage {
  private readonly Elements = {
    productList: ".products",
    productPrice:
      "//li[contains(@class,'product')][.//h4[normalize-space()='replaceKey']]//span[contains(@class,'product-price')]",
    buyButton:
      "//li[contains(@class,'product')][.//h4[normalize-space()='replaceKey']]//a[normalize-space()='Buy']",
  };

  constructor(private readonly page: Page) {}

  async verifyPageLoaded() {
    await expect(this.page.locator(this.Elements.productList)).toBeVisible();
  }

  async getProductPrice(productName: string) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.productPrice,
      productName,
    );
    return PriceUtil.toCents(await this.page.locator(locator).innerText());
  }

  async clickBuy(productName: string) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.buyButton,
      productName,
    );
    await this.page.locator(locator).click();
  }
}
