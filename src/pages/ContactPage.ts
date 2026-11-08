import { Page } from "@playwright/test";
import { expect } from "../support/assert";

export class ContactPage {
  private readonly Elements = {
    forenameInput: "#forename",
    emailInput: "#email",
    messageInput: "#message",
    submitButton: ".btn-contact",
    forenameError: "#forename-err",
    emailError: "#email-err",
    messageError: "#message-err",
    errorBanner: "#header-message .alert-error",
  };

  constructor(private readonly page: Page) {}

  async verifyPageLoaded() {
    await expect(this.page.locator(this.Elements.forenameInput)).toBeVisible();
  }

  async clickSubmit() {
    await this.page.locator(this.Elements.submitButton).click();
  }

  async fillForename(forename: string) {
    await this.page.locator(this.Elements.forenameInput).fill(forename);
  }

  async fillEmail(email: string) {
    await this.page.locator(this.Elements.emailInput).fill(email);
  }

  async fillMessage(message: string) {
    await this.page.locator(this.Elements.messageInput).fill(message);
  }

  async verifyErrorBannerShown() {
    await expect(this.page.locator(this.Elements.errorBanner)).toBeVisible();
  }

  async verifyForenameErrorShown() {
    await expect(this.page.locator(this.Elements.forenameError)).toBeVisible();
  }

  async verifyEmailErrorShown() {
    await expect(this.page.locator(this.Elements.emailError)).toBeVisible();
  }

  async verifyMessageErrorShown() {
    await expect(this.page.locator(this.Elements.messageError)).toBeVisible();
  }

  async verifyErrorBannerCleared() {
    await expect(this.page.locator(this.Elements.errorBanner)).toBeHidden();
  }

  async verifyForenameErrorCleared() {
    await expect(this.page.locator(this.Elements.forenameError)).toBeHidden();
  }

  async verifyEmailErrorCleared() {
    await expect(this.page.locator(this.Elements.emailError)).toBeHidden();
  }

  async verifyMessageErrorCleared() {
    await expect(this.page.locator(this.Elements.messageError)).toBeHidden();
  }
}
