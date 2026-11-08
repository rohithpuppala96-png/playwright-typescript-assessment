import { Page } from "@playwright/test";
import { expect } from "../support/assert";
import { EnvUtil } from "../support/utils/EnvUtil";

export class HomePage {
  private readonly Elements = {
    heading: ".hero-unit h1",
  };

  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(EnvUtil.baseUrl);
  }

  async verifyPageLoaded(expectedText: string) {
    await expect(this.page.locator(this.Elements.heading)).toContainText(
      expectedText,
    );
  }
}
