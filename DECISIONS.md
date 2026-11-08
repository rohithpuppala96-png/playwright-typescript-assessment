# Design decisions

## Why Cucumber

The brief asks for Playwright with TypeScript. Cucumber is open source and sits on top of Playwright as the test runner.

I chose it because this project follows the structure of my own Playwright + Cucumber + TypeScript framework:

- **Readable scenarios:** each test case reads as plain-language steps that map directly to the brief.
- **Reusable steps:** TC1 and TC2 share navigation and form-filling steps.
- **Data-driven runs:** Scenario Outlines run TC2 five times with different data, and each run appears separately in the report.
- **Independent layers:** page objects, locators and test data don't depend on Cucumber, so the same layers would work under Playwright Test.

## Design

- **Page objects with encapsulation:** each page class holds its locators in a private `Elements` object, exposes actions, and owns its `verify...` assertions.
- **Locator strategy:** CSS ids and classes by default. XPath templates with a `replaceKey` placeholder are used for dynamic elements like "the row for this product". Locators find elements, and assertions check them.
- **Test data:** stored in `dynamicData.ts`, keyed by scenario name. Each scenario loads its data in the first step.
- **Per-scenario state:** scenario data and the prices captured on the shop page are stored on the Cucumber World.

## Stability

- No sleeps or fixed waits. All waiting uses Playwright's retrying assertions and auto-waiting actions.
- Each scenario runs in a fresh browser context, so the cart always starts empty.
- The contact submission shows a "Sending Feedback" popup that took roughly 6 to 10 seconds per submission across runs. The success message assertion alone uses a 30-second timeout to absorb this. Everything else uses the 10-second default.
- TC2 passed 15 out of 15 across three local runs, and passed in CI.

## Assumptions

- "Run 5 times" is implemented as 5 runs with different valid data sets.
- For TC3, the unit price displayed on the shop page is the source of truth. The cart's unit price is checked against it. Each subtotal is checked against the cart's displayed price × quantity, and the total against the sum of all subtotals.
