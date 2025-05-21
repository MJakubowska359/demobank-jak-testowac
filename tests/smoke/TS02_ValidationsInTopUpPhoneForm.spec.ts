import { LoginPage } from '../../pages/login.page';
import { NavPage } from '../../pages/nav.page';
import { PhonePage } from '../../pages/phone.page';
import { correctLogin } from '../../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Validations in top-up form', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let phonePage: PhonePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navPage = new NavPage(page);
    phonePage = new PhonePage(page);

    await page.goto('/');
    await loginPage.login(correctLogin);
    await navPage.clickTopUpPhoneButton();
  });

  test('Should not be able to top-up phone if required fields of form are empty', async () => {
    // Arrange
    const expectedError = 'pole wymagane';

    // Act
    await phonePage.clickTopUpPhoneButton();

    // Assert
    await expect(phonePage.error.nth(1)).toHaveText(expectedError);
  });

  test('Should not be able to top-up phone if amount is too low', async () => {
    // Arrange
    const expectedError = 'kwota musi być większa od 10';

    // Act
    await phonePage.fillTooLowAmountInAmountField();

    // Assert
    await expect(phonePage.error).toHaveText(expectedError);
  });

  test('Should not be able to top-up phone if amount is too height', async () => {
    // Arrange
    const expectedError = 'kwota musi być mniejsza od 50';

    // Act
    await phonePage.fillTooHeightAmountInAmountField();

    // Assert
    await expect(phonePage.error).toHaveText(expectedError);
  });
});
