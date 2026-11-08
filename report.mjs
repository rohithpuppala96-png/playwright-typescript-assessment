import dotenv from "dotenv";
import path from "node:path";
import { generate } from "multiple-cucumber-html-reporter";

const envName = process.env.TEST_ENV || "qa";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`), quiet: true });

generate({
    jsonDir: "test-results/reports",
    reportPath: "test-results/html-report",
    reportName: "Jupiter Toys - UI Automation Report",
    pageTitle: "Jupiter Toys Test Report",
    displayDuration: true,
    metadata: {
        browser: { name: process.env.BROWSER || "chromium", version: "latest" },
        device: process.env.CI ? "CI runner" : "Local machine",
        platform: { name: process.platform },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Environment", value: envName },
            { label: "Base URL", value: process.env.BASE_URL || "" },
            { label: "Executed", value: new Date().toLocaleString() },
        ],
    },
});