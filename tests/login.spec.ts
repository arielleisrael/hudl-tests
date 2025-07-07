import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const HUDL_EMAIL = process.env.HUDL_EMAIL!;
const HUDL_PASSWORD = process.env.HUDL_PASSWORD!;

const INVALID_EMAIL = 'invalid@test.c';
const INVALID_EMAIL_FORMAT = 'invalid#wrong.com';
const EMAIL_WITH_SPACES = 'arielle.israel55 @gmail.com';

test.describe('Hudl Login Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page, browserName }) => {
    loginPage = new LoginPage(page, browserName);
  });

  test('should log in successfully with valid credentials', async () => {
    await loginPage.login(HUDL_EMAIL, HUDL_PASSWORD);
    await loginPage.assertLoginSuccess();
  });

  test('should show an error with invalid email', async () => {
    await loginPage.navigateToLogin();
    await loginPage.enterEmail(INVALID_EMAIL);
    await loginPage.assertInvalidEmailError();
  });

  test('should show an error with incorrect password', async () => {
    await loginPage.login(HUDL_EMAIL, 'wrongPassword');
    await loginPage.assertInvalidPasswordError();
  });

  test('should show an error with invalid email format', async () => {
    await loginPage.navigateToLogin();
    await loginPage.enterEmail(INVALID_EMAIL_FORMAT);
    await loginPage.assertInvalidEmailError();
  });

  test('should show an error for an email with spaces', async () => {
    await loginPage.navigateToLogin();
    await loginPage.enterEmail(EMAIL_WITH_SPACES);
    await loginPage.assertInvalidEmailError();
  });

  test('should continue to log in using Google', async () => {
    await loginPage.navigateToLogin();
    await loginPage.assertGoogleLogin();
  });

  test('should continue to log in using Facebook', async () => {
    await loginPage.navigateToLogin();
    await loginPage.assertFacebookLogin();
  });

  test('should continue to log in using Apple', async () => {
    await loginPage.navigateToLogin();
    await loginPage.assertAppleLogin();
  });

  test('should open the Privacy Policy in a new tab', async () => {
    await loginPage.navigateToLogin();
  
    await loginPage.openAndVerifyPrivacyPolicy();
  });

  test('should open the Terms of Service in a new tab', async () => {
    await loginPage.navigateToLogin();
  
    await loginPage.openAndVerifyTermsOfService();
  });
});

