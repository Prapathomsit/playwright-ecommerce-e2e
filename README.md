# Playwright E2E Test Automation & CI/CD Reporting Pipeline

An end-to-end (E2E) automated testing framework for **SauceDemo** built with **Playwright** and **TypeScript**, utilizing the **Page Object Model (POM)** design pattern. Integrated with **GitHub Actions** for scheduled cross-browser CI/CD execution and a custom **Google Apps Script Webhook** for real-time test reporting.

## Architecture & Workflow
1. **Trigger:** GitHub Actions initiates runs automatically via daily cron schedule or code push.
2. **Execution:** Playwright runs end-to-end test suites across Chromium, Firefox, and WebKit.
3. **Data Streaming:** A custom TypeScript reporter formats test results and sends them via HTTP POST.
4. **Reporting:** Google Apps Script Webhook receives the payload and updates Google Sheets in real time.

## Tech Stack
* **Test Framework:** Playwright Test Runner
* **Language:** TypeScript
* **Design Pattern:** Page Object Model (POM)
* **CI/CD & Scheduling:** GitHub Actions (Daily Cron Job and Push Triggers)
* **Automated Reporting:** Custom Playwright Reporter and Google Apps Script API

## Project Structure
* `.github/workflows/playwright.yml` - CI/CD pipeline configuration and daily cron schedule
* `pages/LoginPage.ts` - Page Object Model containing locators and page actions
* `tests/google-sheets-reporter.ts` - Custom reporter streaming test results via Webhook
* `tests/saucedemo.spec.ts` - E2E test suites covering TC-01 through TC-04
* `playwright.config.ts` - Cross-browser and custom reporter configurations

## Test Suites & Coverage
* **TC-01 (Happy Path):** End-to-end authentication and checkout flow (`standard_user`).
* **TC-02 (Negative Testing):** Error handling validation for locked accounts (`locked_out_user`).
* **TC-03 (UI Anomaly Detection):** Automated assertion catching input field bugs (`problem_user`).
* **TC-04 (Performance Benchmarking):** Latency measurement stabilized with explicit visibility waits to prevent cloud race conditions (`performance_glitch_user`).

## Live Automated Test Report & Bug Log
* [View Live Execution Logs & Bug Report (Google Sheets)](https://docs.google.com/spreadsheets/d/19KROjkgRaDWTIVBfifGJpQjuhYWc4qtKpqVOdnpXm80/edit?usp=sharing)

## Local Setup & Execution
1. Clone the repository:
   ```bash
   git clone [https://github.com/Prapathomsit/playwright-ecommerce-e2e.git](https://github.com/Prapathomsit/playwright-ecommerce-e2e.git)
