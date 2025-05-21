import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class PhonePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for top-up phone form
  amountInput = this.page.locator('#widget_1_topup_amount');
  topUpPhoneButton = this.page.getByRole('button', { name: 'doładuj telefon' });

  // Locators for assertions
  error = this.page.locator('.error');
  newMessage = this.page.locator('#show_messages');

  async clickTopUpPhoneButton(): Promise<void> {
    await this.topUpPhoneButton.click();
  }

  async fillTooLowAmountInAmountField(): Promise<void> {
    await this.amountInput.fill('9,99');
    await this.amountInput.blur();
  }

  async fillTooHeightAmountInAmountField(): Promise<void> {
    await this.amountInput.fill('500');
    await this.amountInput.blur();
  }
}
