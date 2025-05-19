import { LoginPage } from '../../pages/login.page';
import {
  correctLogin,
  shortId,
  shortPassword,
} from '../../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Validations in login form', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
  });

  test('Should not be able to log in if id field are empty', async () => {
    // Arrange
    const expectedError = 'pole wymagane';

    // Act
    await loginPage.pressEnterInIdField();

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
  });

  test('Should not be able to log in if id field are invalid', async () => {
    // Arrange
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    await loginPage.fillShortIdAndPressEnterInIdField(shortId);

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
    await expect(loginPage.nextButton).toBeDisabled();
  });

  test('Should not be able to log in if password field are empty', async () => {
    // Arrange
    const expectedError = 'pole wymagane';

    // Act
    await loginPage.pressEnterInPasswordField(correctLogin);

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
  });

  test('Should not be able to log in if password field are invalid', async () => {
    // Arrange
    const expectedError = 'hasło ma min. 8 znaków';

    // Act
    await loginPage.fillShortPasswordAndPressEnterInPasswordField(
      shortPassword,
    );

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
    await expect(loginPage.loginButton).toBeDisabled();
  });
});
