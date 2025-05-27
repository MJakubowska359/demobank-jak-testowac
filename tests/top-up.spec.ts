import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { NavPage } from '../pages/nav.page';
import { PhonePage } from '../pages/phone.page';
import {
  correctAmount,
  heightAmount,
  lowAmount,
  phoneNumber,
} from '../test-data/form_data';
import { correctLogin } from '../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Check validations top-up form and make success mobile top-up', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let phonePage: PhonePage;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navPage = new NavPage(page);
    phonePage = new PhonePage(page);
    mainPage = new MainPage(page);

    await page.goto('/');
    await loginPage.login(correctLogin);
    await navPage.clickTopUpPhoneBookmark();
  });

  test(
    'Should not be able to top-up phone if required fields of form are empty',
    { tag: ['@top-up', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'pole wymagane';

      // Act
      await phonePage.clickTopUpPhoneButton();

      // Assert
      await expect(phonePage.error.nth(1)).toHaveText(expectedError);
    },
  );

  test(
    'Should not be able to top-up phone if amount is too low',
    { tag: ['@top-up', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'kwota musi być większa od 10';

      // Act
      await phonePage.fillTooLowAmountInAmountField(lowAmount);

      // Assert
      await expect(phonePage.error).toHaveText(expectedError);
    },
  );

  test(
    'Should not be able to top-up phone if amount is too height',
    { tag: ['@top-up', '@smoke'] },
    async () => {
      // Arrange
      const expectedError = 'kwota musi być mniejsza od 50';

      // Act
      await phonePage.fillTooHeightAmountInAmountField(heightAmount);

      // Assert
      await expect(phonePage.error).toHaveText(expectedError);
    },
  );

  test(
    'Should be able to top-up phone for selected number',
    { tag: ['@top-up', '@e2e'] },
    async () => {
      // Arrange
      const expectedTopUpAmount = correctAmount.value;
      const selectedPhoneNumber = phoneNumber.value;
      const expectedMessage = `Doładowanie wykonane! ${expectedTopUpAmount}PLN na numer ${selectedPhoneNumber}`;

      // Act
      await phonePage.selectPhoneNumber(phoneNumber);
      await expect(phonePage.amountInput).toHaveValue(expectedTopUpAmount);
      await phonePage.acceptTerms();
      await phonePage.clickTopUpPhoneButton();

      // Assert
      await expect(mainPage.newMessage).toHaveText(expectedMessage);
    },
  );
});
