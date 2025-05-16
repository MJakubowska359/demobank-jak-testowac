import { LoginPage } from '../../pages/login.page';
import { shortId } from '../../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Validations in login form', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
  });

  test('Should not be able to log in if id field are empty', async ({
    page,
  }) => {
    // Arrange
    const expectedError = 'pole wymagane';

    // Act
    await page.goto('/');
    await loginPage.pressEnterInIdField();

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
  });

  test('Should not be able to log in if id field are invalid', async ({
    page,
  }) => {
    // Arrange
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    await page.goto('/');
    await loginPage.fillShortIdAndPressEnterInIdField(shortId);

    // Assert
    await expect(loginPage.error).toHaveText(expectedError);
  });
});
