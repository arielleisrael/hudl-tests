import { Page, expect } from '@playwright/test';
import { assertOAuthRedirect } from '../utils/oauthRedirect';
import type { BrowserName } from '../types/BrowserName';

export class LoginPage {
  constructor(private page: Page, private browserName?: BrowserName) {}

  async navigateToLogin() {
    await this.page.goto('https://www.hudl.com');
    await this.page.click('[data-qa-id="login-select"]');
    await this.page.click('[data-qa-id="login-hudl"]');
  }

  async enterEmail(email: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.click('[type="submit"]');
  }

  async enterPassword(password: string) {
    await this.page.getByLabel('Password').fill(password);
    await this.page.click('[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.navigateToLogin();
    await this.enterEmail(email);
    await this.enterPassword(password);
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.hudl.com/home');
  }

  async assertInvalidEmailError() {
    await expect(this.page.locator('#error-element-username')).toBeVisible({ timeout: 10000 });
  }

  async assertInvalidPasswordError() {
    const errorMsg = this.page.locator('#error-element-password');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toHaveText(/Your email or password is incorrect/i);
  }

  async assertGoogleLogin() {
    await assertOAuthRedirect(this.page, 'google', '[data-provider="google"]', { browserName: this.browserName });
  }

  async assertFacebookLogin() {
    await assertOAuthRedirect(this.page, 'facebook', '[data-provider="facebook"]', { browserName: this.browserName });
  }

  async assertAppleLogin() {
    await assertOAuthRedirect(this.page, 'apple', '[data-provider="apple"]', { browserName: this.browserName });
  }

  async openAndVerifyPrivacyPolicy(): Promise<void> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('link', { name: 'Privacy Policy' }).click()
    ]);
  
    await newPage.waitForLoadState('load');
    await expect(newPage).toHaveURL(/privacy/i);
    await newPage.close(); // Auto-close the new tab
  }

  async openAndVerifyTermsOfService(): Promise<void> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('link', { name: 'Terms of Service' }).click()
    ]);
  
    await newPage.waitForLoadState('load');
    await expect(newPage).toHaveURL(/terms/i);
    await newPage.close(); // Auto-close the new tab
  }
}

