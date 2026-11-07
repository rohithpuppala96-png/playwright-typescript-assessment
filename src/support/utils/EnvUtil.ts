import dotenv from "dotenv";
import path from "path";

const envName = process.env.TEST_ENV || "qa";

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${envName}`),
  quiet: true,
});

function getRequired(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required env variable "${key}" in .env.${envName}`,
    );
  }
  return value;
}

function getNumber(key: string, fallback: number): number {
  const raw = process.env[key];
  if (raw === undefined || raw.trim() === "") {
    return fallback;
  }
  const value = Number(raw);
  return Number.isNaN(value) ? fallback : value;
}

export class EnvUtil {
  static readonly environment = envName;

  static get baseUrl(): string {
    return getRequired("BASE_URL");
  }

  static get browser(): string {
    return process.env.BROWSER || "chromium";
  }

  static get headless(): boolean {
    return process.env.HEADLESS !== "false";
  }

  static get testTimeoutMs(): number {
    return getNumber("TEST_TIMEOUT", 2) * 60_000;
  }

  static get browserLaunchTimeoutMs(): number {
    return getNumber("BROWSER_LAUNCH_TIMEOUT", 30_000);
  }

  static get expectTimeoutMs(): number {
    return getNumber("EXPECT_TIMEOUT", 10_000);
  }

  static get retries(): number {
    return getNumber("RETRIES", 0);
  }

  static get parallel(): number {
    return getNumber("PARALLEL_THREAD", 1);
  }

  static get recordVideo(): boolean {
    return process.env.RECORD_VIDEO === "true";
  }
}
