import { FormModel } from '../models/form.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class PhonePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for top-up phone form
  phoneNumber = this.page.locator('#widget_1_topup_receiver');
  amountInput = this.page.locator('#widget_1_topup_amount');
  termsCheckbox = this.page.getByRole('checkbox');
  topUpPhoneButton = this.page.getByRole('button', { name: 'doładuj telefon' });

  // Locators for assertions
  error = this.page.locator('.error');

  async clickTopUpPhoneButton(): Promise<void> {
    await this.topUpPhoneButton.click();
  }

  async fillTooLowAmountInAmountField(amount: FormModel): Promise<void> {
    await this.amountInput.fill(amount.value);
    await this.amountInput.blur();
  }

  async fillTooHeightAmountInAmountField(amount: FormModel): Promise<void> {
    await this.amountInput.fill(amount.value);
    await this.amountInput.blur();
  }

  async selectPhoneNumber(number: FormModel): Promise<void> {
    await this.phoneNumber.selectOption(number.value);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }
}
