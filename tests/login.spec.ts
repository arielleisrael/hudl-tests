import { test, expect } from '@playwright/test';
import {
  navigatetoHudlLoginPage,
  enterEmail,
  completeFullLogin
} from '../utils/login';

const HUDL_EMAIL = process.env.HUDL_EMAIL!;
const HUDL_PASSWORD = process.env.HUDL_PASSWORD!;

test.describe('Hudl Login Tests', () => {

  test('should login with valid credentials', async ({ page }) => {
    await completeFullLogin(page, HUDL_EMAIL, HUDL_PASSWORD)

    // Verify successful login
    await expect(page).toHaveURL('https://www.hudl.com/home');
  });

  test('should show an error for invalid email', async ({ page }) => {
    await navigatetoHudlLoginPage(page);
    await enterEmail(page, 'invalid@test.c');

    // Verify error message for invalid email
    const errorMsg = page.locator('#error-element-username');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toHaveText(/Enter a valid email./i);
  });

  test('should show an error for invalid password', async ({ page }) => {
    await completeFullLogin(page, HUDL_EMAIL, 'wrongPassword')

    await page.pause();

    // Verify error message for invalid password
    const errorMsg = page.locator('#error-element-password');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toHaveText(/Your email or password is incorrect. Try again./i);
  });

});



/* test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
}); */
