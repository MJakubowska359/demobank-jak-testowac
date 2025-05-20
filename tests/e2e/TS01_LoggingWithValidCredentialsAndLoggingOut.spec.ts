import { LoginPage } from '../../pages/login.page';
import { correctLogin } from '../../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Logging with valid credentials and logging out', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
  });

  test('Should be able to log in with valid credentials', async () => {
    // Arrange
    const expectedUserNameOnDashboard = 'Jan Demobankowy';

    // Act
    await loginPage.login(correctLogin);

    // Assert
    await expect(loginPage.userName).toHaveText(expectedUserNameOnDashboard);
  });

  test('Should be able to log out successfully', async () => {
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
  });
});
