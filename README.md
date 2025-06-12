# Hudl Login Tests

This project contains login tests for the [Hudl](https://www.hudl.com) web application, built with [Playwright](https://playwright.dev/) and written in TypeScript.

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
Create a .env file in the root with your test credentials:
```
HUDL_EMAIL=your-email@example.com
HUDL_PASSWORD=yourPassword123
```

### 4. Run the login tests
```
npx playwright test
```

## Future Improvements
- Implement Page Object Model (POM) structure

- Expand test coverage to include alternate login methods and forgot password

- Create a workflow using GitHub Actions to schedule test runs

- Use GitHub Secrets to store credentials
