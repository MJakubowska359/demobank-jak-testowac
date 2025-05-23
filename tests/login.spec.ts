import { LoginPage } from '../pages/login.page';
import { correctLogin, shortId, shortPassword } from '../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Check validations login form, log in with valid credentials and log out', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
  });

  test(
    'Should not be able to log in if id field are empty',
    { tag: ['@login', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'pole wymagane';

      // Act
      await loginPage.pressEnterInIdField();

      // Assert
      await expect(loginPage.error).toHaveText(expectedError);
    },
  );

  test(
    'Should not be able to log in if id field are invalid',
    { tag: ['@login', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.fillShortIdAndPressEnterInIdField(shortId);

      // Assert
      await expect(loginPage.error).toHaveText(expectedError);
      await expect(loginPage.nextButton).toBeDisabled();
    },
  );

  test(
    'Should not be able to log in if password field are empty',
    { tag: ['@login', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'pole wymagane';

      // Act
      await loginPage.pressEnterInPasswordField(correctLogin);

      // Assert
      await expect(loginPage.error).toHaveText(expectedError);
    },
  );

  test(
    'Should not be able to log in if password field are invalid',
    { tag: ['@login', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'hasło ma min. 8 znaków';

      // Act
      await loginPage.fillShortPasswordAndPressEnterInPasswordField(
        shortPassword,
      );

      // Assert
      await expect(loginPage.error).toHaveText(expectedError);
      await expect(loginPage.loginButton).toBeDisabled();
    },
  );

  test(
    'Should be able to log in with valid credentials',
    { tag: ['@login', '@e2e'] },
    async () => {
      // Arrange
      const expectedUserNameOnDashboard = 'Jan Demobankowy';

      // Act
      await loginPage.login(correctLogin);

      // Assert
      await expect(loginPage.userName).toHaveText(expectedUserNameOnDashboard);
    },
  );

  test(
    'Should be able to log out successfully',
    { tag: ['@login', '@e2e'] },
    async () => {
      // Arrange
      const expectedHeaderOnTheMainPage =
        'Wersja demonstracyjna serwisu demobank';

      // Act
      await loginPage.login(correctLogin);
      await loginPage.clickLogoutButton();

      // Assert
      await expect(loginPage.header.nth(1)).toHaveText(
        expectedHeaderOnTheMainPage,
      );
    },
  );
});
