/* eslint-disable playwright/no-wait-for-timeout */
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { NavPage } from '../pages/nav.page';
import { correctLogin } from '../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Check refresh session', () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let navPage: NavPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    navPage = new NavPage(page);

    await page.goto('/');
    await loginPage.login(correctLogin);
  });

  test(
    'Should be able to refresh session between navigation by bookmarks',
    { tag: '@smoke' },
    async ({ page }) => {
      // Arrange
      const expectedSecondBeforeRefresh = '55';
      const expectedMinutesAfterRefresh = '10';

      // Act
      await page.waitForTimeout(5_000);
      await expect(mainPage.seconds).toHaveText(expectedSecondBeforeRefresh);
      await navPage.clickTopUpPhoneBookmark();

      // Assert
      await expect(mainPage.minutes).toHaveText(expectedMinutesAfterRefresh);
    },
  );
});
