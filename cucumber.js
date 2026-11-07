const dotenv = require("dotenv");
const path = require("path");

const envName = process.env.TEST_ENV || "qa";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`), quiet: true });

module.exports = {
    default: {
        paths: ["features/**/*.feature"],
        requireModule: ["tsx/cjs"],
        require: ["src/support/world.ts", "src/support/hooks.ts", "src/steps/**/*.ts"],
        format: ["progress", "json:test-results/reports/cucumber-report.json"],
        formatOptions: { snippetInterface: "async-await" },
        parallel: Number(process.env.PARALLEL_THREAD || 1),
        retry: Number(process.env.RETRIES || 0),
        tags: "not @ignore",
    },
};