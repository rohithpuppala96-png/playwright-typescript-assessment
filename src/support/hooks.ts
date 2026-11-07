import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import fs from "fs";
import { BrowserManager } from "./manager/BrowserManager";
import { EnvUtil } from "./utils/EnvUtil";
import { CustomWorld } from "./world";

let browser: Browser;

setDefaultTimeout(EnvUtil.testTimeoutMs);

BeforeAll(async function () {
  browser = await BrowserManager.launch();
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    baseURL: EnvUtil.baseUrl,
    viewport: { width: 1366, height: 768 },
    recordVideo: EnvUtil.recordVideo
      ? { dir: "test-results/videos" }
      : undefined,
  });
  this.context.setDefaultTimeout(EnvUtil.expectTimeoutMs);
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }) {
  const screenshot = await this.page.screenshot({ fullPage: true });
  this.attach(screenshot, "image/png");

  const video = this.page.video();
  await this.context.close();

  if (video && result?.status === Status.PASSED) {
    await fs.promises.rm(await video.path(), { force: true });
  }
});

AfterAll(async function () {
  await browser?.close();
});
