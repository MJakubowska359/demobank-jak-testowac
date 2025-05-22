import { LoginPage } from '../../pages/login.page';
import { NavPage } from '../../pages/nav.page';
import { PhonePage } from '../../pages/phone.page';
import { correctAmount, phoneNumber } from '../../test-data/form_data';
import { correctLogin } from '../../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Top-up phone', () => {
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

  test('Should be able to top-up phone for selected number', async () => {
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
    await expect(phonePage.newMessage).toHaveText(expectedMessage);
  });
});
