import { Page, expect } from '@playwright/test';
import type { BrowserName } from '../types/BrowserName';

type Provider = 'google' | 'facebook' | 'apple';

const providerUrls: Record<Provider, RegExp> = {
  google: /accounts\.google\.com/,
  facebook: /facebook\.com/,
  apple: /appleid\.apple\.com/
};

/**
 * Asserts that clicking a third-party login button redirects to the expected OAuth provider.
 * Retries clicking the button once if the initial redirect does not occur.
 *
 * @param page - The Playwright page instance
 * @param provider - The provider to validate (e.g., 'google', 'facebook', 'apple')
 * @param selector - The CSS selector used to trigger the login action
 */

export async function assertOAuthRedirect(page: Page, provider: Provider, selector: string, options?: {browserName?: BrowserName}) {
  const expectedUrl = providerUrls[provider];
  const browserName = options?.browserName;

  if (provider === 'apple' && browserName === 'webkit') {
    console.warn('Skipping Apple login test on WebKit due to unsupported native popup.');
    return;
  }

  await page.click(selector);

  // Initial wait in case redirect happens immediately
  await page.waitForTimeout(1000);

  let currentUrl = page.url();

  // Already redirected to OAuth provider
  if (expectedUrl.test(currentUrl)) {
    await expect(page).toHaveURL(expectedUrl);
    return;
  }

  // Retry click if still stuck on Hudl login page
  //   Note: This is a workaround for an issue where sometimes more than one the click is needed 
  if (/identity\.hudl\.com/.test(currentUrl)) {
    await page.click(selector);
    await page.waitForTimeout(2000);
    currentUrl = page.url();
  }

  // Final confirmation
  await expect(page).toHaveURL(expectedUrl);
}