import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { EnvUtil } from "../utils/EnvUtil";

export class BrowserManager {
  private static readonly browserTypes: Record<string, BrowserType> = {
    chromium,
    firefox,
    webkit,
  };

  static async launch(): Promise<Browser> {
    const browserType = this.browserTypes[EnvUtil.browser];
    if (!browserType) {
      throw new Error(
        `Unsupported BROWSER "${EnvUtil.browser}". Use chromium, firefox or webkit.`,
      );
    }
    return browserType.launch({
      headless: EnvUtil.headless,
      timeout: EnvUtil.browserLaunchTimeoutMs,
    });
  }
}
