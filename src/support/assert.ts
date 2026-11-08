import { expect as baseExpect } from "@playwright/test";
import { EnvUtil } from "./utils/EnvUtil";

export const expect = baseExpect.configure({timeout: EnvUtil.expectTimeoutMs});
