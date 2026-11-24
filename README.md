# Playwright E2E Tests for SauceDemo

End-to-end tests for the [SauceDemo](https://www.saucedemo.com) store, written in Playwright and TypeScript using the Page Object Model. The suite runs on GitHub Actions on every push and once a day, across Chromium, Firefox and WebKit. A custom reporter sends each result to a [live Google Sheet](https://docs.google.com/spreadsheets/d/19KROjkgRaDWTIVBfifGJpQjuhYWc4qtKpqVOdnpXm80/edit?usp=sharing).

## Why I built this

I built this project to practise the core skills of a QA automation tester: designing test cases, writing maintainable tests with the Page Object Model, running them automatically in CI, and reporting results in a form that anyone on the team can read.

## Test cases

| ID | What it checks | User |
|---|---|---|
| TC-01 | Logs in and adds a product to the cart | `standard_user` |
| TC-02 | Shows an error for a locked-out account | `locked_out_user` |
| TC-03 | Catches the checkout bug where Last Name does not keep its value | `problem_user` |
| TC-04 | Measures how long products take to load, using an explicit wait | `performance_glitch_user` |

## Run locally

```bash
npm ci
npx playwright install
npm test
```

Use `npm run test:headed` to watch the browser, `npm run test:ui` to use Playwright's interactive runner, or `npm run test:report` to open the latest HTML report.

Results are sent to Google Sheets only when `GOOGLE_SHEETS_WEBHOOK` is set.

## Structure

- `pages/LoginPage.ts`: page object for the login page
- `tests/saucedemo.spec.ts`: test cases
- `tests/google-sheets-reporter.ts`: custom reporter that posts results to the webhook
- `.github/workflows/playwright.yml`: CI on push, pull request and daily at 02:00 (Bangkok time)
