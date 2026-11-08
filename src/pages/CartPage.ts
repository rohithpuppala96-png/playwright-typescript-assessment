import { Page } from "@playwright/test";
import { expect } from "../support/assert";
import { LocatorUtil } from "../support/utils/LocatorUtil";
import { PriceUtil } from "../support/utils/PriceUtil";

export class CartPage {
  private readonly Elements = {
    cartTable: "table.cart-items",
    cartRows: "//tr[contains(@class,'cart-item')]",
    itemPrice:
      "//tr[contains(@class,'cart-item')][td[1][normalize-space()='replaceKey']]/td[2]",
    itemQuantity:
      "//tr[contains(@class,'cart-item')][td[1][normalize-space()='replaceKey']]/td[3]//input",
    itemSubtotal:
      "//tr[contains(@class,'cart-item')][td[1][normalize-space()='replaceKey']]/td[4]",
    allSubtotals: "//tr[contains(@class,'cart-item')]/td[4]",
    total: "strong.total",
  };

  constructor(private readonly page: Page) {}

  async verifyPageLoaded() {
    await expect(this.page.locator(this.Elements.cartTable)).toBeVisible();
  }

  async verifyNumberOfItems(count: number) {
    await expect(this.page.locator(this.Elements.cartRows)).toHaveCount(count);
  }

  async verifyItemQuantity(productName: string, quantity: number) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.itemQuantity,
      productName,
    );
    await expect(this.page.locator(locator)).toHaveValue(String(quantity));
  }

  async getItemPrice(productName: string) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.itemPrice,
      productName,
    );
    return PriceUtil.toCents(await this.page.locator(locator).innerText());
  }

  async getItemQuantity(productName: string) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.itemQuantity,
      productName,
    );
    return Number(await this.page.locator(locator).inputValue());
  }

  async getItemSubtotal(productName: string) {
    const locator = LocatorUtil.replaceHolders(
      this.Elements.itemSubtotal,
      productName,
    );
    return PriceUtil.toCents(await this.page.locator(locator).innerText());
  }

  async getTotal() {
    return PriceUtil.toCents(
      await this.page.locator(this.Elements.total).innerText(),
    );
  }

  async verifyItemPrice(productName: string, expectedPriceCents: number) {
    const actual = await this.getItemPrice(productName);
    expect(actual, `Unit price for ${productName}`).toBe(expectedPriceCents);
  }

  async verifyItemSubtotal(productName: string) {
    const price = await this.getItemPrice(productName);
    const quantity = await this.getItemQuantity(productName);
    const subtotal = await this.getItemSubtotal(productName);
    expect(subtotal, `Subtotal for ${productName} (price x quantity)`).toBe(
      price * quantity,
    );
  }

  async verifyTotal() {
    const subtotals = await this.page
      .locator(this.Elements.allSubtotals)
      .allInnerTexts();
    let sumOfSubtotals = 0;
    for (const text of subtotals) {
      sumOfSubtotals += PriceUtil.toCents(text);
    }
    expect(await this.getTotal(), "Total (sum of all subtotals)").toBe(
      sumOfSubtotals,
    );
  }
}
