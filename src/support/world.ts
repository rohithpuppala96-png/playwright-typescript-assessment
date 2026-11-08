import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  currentData: Record<string, any> = {};
  capturedPrices: Record<string, number> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);