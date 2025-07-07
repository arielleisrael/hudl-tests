# Hudl Login Tests

This project contains automated UI tests for validating the login functionality of [Hudl](https://www.hudl.com), implemented using [Playwright](https://playwright.dev/) with TypeScript.

The test suite is structured with best practices in mind, including the use of the **Page Object Model (POM)**, environment variables for credentials, and reusable helper functions.

## Project Structure

```
hudl-tests/
├── pages/
│ └── LoginPage.ts # Page Object Model for login page actions and assertions
├── tests/
│ └── login.spec.ts # All login test scenarios
├── types/
│ └── BrowserName.ts # Custom type for supported browser names
├── utils/
│ └── oauthRedirect.ts # Shared helper for validating third-party redirects
├── .env # Stores test credentials (not committed)
├── playwright.config.ts # Playwright configuration
├── package.json
└── README.md
```

## Features Covered

- Standard login with valid credentials
- Error handling for invalid or malformed email addresses
- Error handling for incorrect passwords
- Social login redirects for Google, Facebook, and Apple
- Footer link validation for Privacy Policy and Terms of Service
- Cross-browser support for Chromium, Firefox, and WebKit

## Getting Started

### 1. Clone the repo
```
git clone https://github.com/arielleisrael/hudl-tests.git
 
cd hudl-tests
```

### 2. Install dependencies
```
npm install
```

### 3. Set up your .env file
Create a .env file in the project root directory with your test credentials:
```
HUDL_EMAIL=your-email@example.com
HUDL_PASSWORD=yourPassword123
```

### 4. Run the login tests
```
npx playwright test
```

### 5. Review the test results
```
npx playwright show-report
```

## Future Improvements
- Add support for password recovery flow

- Secure credentials using GitHub secrets (for CI)

- Integrate with CI/CD pipelines for continuous testing

## Notes for Reviewers
- The Page Object Model is fully implemented for all login and footer interactions.

- Third-party login tests use a helper to validate OAuth redirects and accommodate browser-specific behaviors.

- Possible Defect: During testing, I encountered an issue where the third-party login (e.g., Google, Apple) required clicking the “Continue with [Provider]” button more than once to redirect to the OAuth provider. Within the helper, I added a workaround to retry the click if the user remains on the login page after the first attempt. This behavior appears inconsistent across browsers and may reflect an issue worth further investigation.

- The suite is intentionally scoped to the login flow as outlined in the assignment, but it is built to scale.

