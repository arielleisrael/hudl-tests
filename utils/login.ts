import { Page } from '@playwright/test';

export async function navigatetoHudlLoginPage(page: Page) {
  await page.goto('https://www.hudl.com');

  // Click on the "Log in" button
  await page.click('[data-qa-id="login-select"]');

  // Select "Hudl" from the dropdown menu
  await page.click('[data-qa-id="login-hudl"]');  
}

export async function enterEmail(page: Page, email: string) {
  await page.getByLabel('Email').fill(email);
  await page.click('[type="submit"]');
}

export async function enterPassword(page: Page, password: string) {
  await page.getByLabel('Password').fill(password);
  await page.click('[type="submit"]');
}

export async function completeFullLogin(page: Page, email: string, password: string) {
  await navigatetoHudlLoginPage(page);

  // Fill in credentials
  await enterEmail(page, email);
  await enterPassword(page, password); 
}