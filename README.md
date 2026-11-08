# Jupiter Toys – UI Automation

UI test automation for the Jupiter Toys demo site, built with **Playwright**, **TypeScript** and **Cucumber**.

Design choices, assumptions, trade-offs and known issues are in [DECISIONS.md](DECISIONS.md).

## Test cases

| ID | Scenario | Feature file |
|----|----------|--------------|
| TC1 | Contact form: mandatory field errors are shown, then cleared once valid data is entered | `features/contact.feature` |
| TC2 | Contact form: successful submission, run 5 times with 5 valid data sets | `features/contact.feature` |
| TC3 | Cart: unit prices, subtotals and total are calculated correctly | `features/cart.feature` |

All three products in TC3 (Stuffed Frog, Fluffy Bunny, Valentine Bear) were available, so no substitutes were needed.

## Prerequisites

- [Node.js](https://nodejs.org/) 26 (the version used locally and in CI)
- npm (comes with Node.js)
- Git

## Installation

```bash
git clone https://github.com/rohithpuppala96-png/playwright-typescript-assessment.git
cd playwright-typescript-assessment
npm ci
npx playwright install chromium
```

## Configuration

Settings live in `.env.qa`, which is selected by `TEST_ENV` and defaults to `qa`.

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASE_URL` | Site under test | required |
| `BROWSER` | `chromium`, `firefox` or `webkit` | `chromium` |
| `HEADLESS` | `false` shows the browser | `true` unless set to `false` |
| `TEST_TIMEOUT` | Maximum time per step, in minutes | `2` |
| `EXPECT_TIMEOUT` | How long assertions retry, in ms | `10000` |
| `RETRIES` | Retries for failed scenarios | `0` |
| `PARALLEL_THREAD` | Parallel workers | `1` |
| `RECORD_VIDEO` | Keep a video of failed scenarios | `false` |

Environment variables already set in the shell or CI take precedence over the file. For example, CI sets `HEADLESS=true`.

## Running the tests

```bash
npm test                                         # all tests
npm test -- --tags "@contact"                    # one feature
npm test -- --tags "@TC03_CartCalculation"       # one test case
npm run typecheck                                # TypeScript type check
```

To run headless locally:

```bash
HEADLESS=true npm test
```

To step through actions in the Playwright Inspector (Git Bash or macOS/Linux shell):

```bash
PWDEBUG=1 TEST_TIMEOUT=30 npm test -- --tags "@TC01_ContactValidation"
```

## Reports

After a test run, generate the HTML report:

```bash
npm run report
```

Then open `test-results/html-report/index.html` in a browser. It shows each feature, scenario and step with its duration, and a full-page screenshot is attached to every scenario.

The raw Cucumber JSON is in `test-results/reports/cucumber-report.json`.

## Continuous integration

The pipeline is defined in `.github/workflows/ui-tests.yml` and runs on **GitHub Actions**:

- **Triggers:** every push to `main`, or manually via **Actions → UI Tests → Run workflow**.
- **Steps:** install dependencies, install Chromium, type check, run the tests headless, then generate the report.
- **Report:** uploaded as the **test-report** artifact on every run, including failed runs. Open the run's summary page, download the artifact, and open `html-report/index.html`.
.

## Project structure

```
├── .github/workflows/ui-tests.yml   CI pipeline
├── data/testData/dynamicData.ts     Test data, keyed by scenario name
├── features/                        Gherkin feature files
├── src/
│   ├── common/NavBar.ts             Navigation bar shared by all pages
│   ├── pages/                       Page objects (locators + actions + assertions)
│   ├── steps/                       Step definitions, grouped by page
│   └── support/
│       ├── hooks.ts                 Browser and per-scenario context lifecycle
│       ├── world.ts                 Per-scenario state (page, data, captured prices)
│       ├── assert.ts                expect configured with EXPECT_TIMEOUT
│       ├── manager/BrowserManager.ts
│       └── utils/                   EnvUtil, getData, LocatorUtil, PriceUtil
├── .env.qa                          Environment configuration
├── cucumber.js                      Cucumber configuration
└── report.mjs                       HTML report generator
```