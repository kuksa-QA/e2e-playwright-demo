# e2e-playwright-demo

A TypeScript-based end-to-end and UI test automation framework built with **Playwright**.  
The project demonstrates a **Page Object Model (POM)** architecture, reusable components, and realistic user flows against a public demo application.

**Target application:** https://automationexercise.com/

---

## 🧰 Tech Stack

- Playwright (`@playwright/test`)
- TypeScript
- Page Object Model (POM)
- Cross-browser testing (Chromium, Firefox, WebKit)

---

## 📁 Project Structure

```text
├── fixture/
│   └── test-data.ts          # Test users and reusable data
│
├── pages/
│   ├── components/           # Reusable UI components (Header, Modals, Cards)
│   ├── base-page.ts          # Base page abstraction
│   ├── home-page.ts
│   ├── login-page.ts
│   ├── cart-page.ts
│   ├── checkout-page.ts
│   ├── payment-page.ts
│   └── ...
│
├── src/
│   └── types/
│       └── country.ts        # Shared enums / types
│
├── tests/
│   ├── smoke/                # High-level business flows
│   └── ui/                   # UI and visual assertions
│
├── playwright.config.ts
├── package.json
└── README.md
```
## 🚀 Getting Started
1️⃣ Clone the repository
```
git clone https://github.com/kuksa-QA/e2e-playwright-demo.git
cd e2e-playwright-demo
```
2️⃣ Install dependencies
`npm install`

3️⃣ Install Playwright browsers
`npm run install:browsers`

## ▶️ Running Tests
Run all tests
`npm test`

Run tests with Playwright UI
`npm run test:ui`

Run tests in headed mode
`npm run test:headed`

Debug tests step-by-step
`npm run test:debug`

## Targeted Test Runs
Smoke tests
`npm run test:smoke-tests`

UI tests only
`npm run test:ui-tests`

Run on a single browser
`npm run test:chromium`

## 📊 Test Reports
After test execution, open the HTML report:
`npm run test:report`

## 🌍 Browsers & Configuration

Tests are executed on:
- Chromium
- Firefox
- WebKit

## Configuration is defined in playwright.config.ts:
- Parallel execution
- Automatic retries on CI
- HTML reporting
- Tracing on first retry

## 🧠 Design Decisions
- Page Object Model for maintainability and readability
- Reusable UI components (Header, Modals, Cards)
- Type-safe test data and enums
- Serial tests for multi-step business flows
- Parallel UI tests for faster feedback

## ⚠️ Notes

- This project is intended as a demo / portfolio example
- Test coverage is representative, not exhaustive
- The tested application is a public demo site

## 👤 Author - Ekaterina Kuksa
Created for demonstration and learning purposes using Playwright and TypeScript.

Please take into consideration that target application might be unstable (some test will either run locally, or in CI).
