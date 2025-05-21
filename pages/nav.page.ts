import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class NavPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for navigation form
  topUpPhone = this.page.getByRole('link', { name: 'doładowanie telefonu' });

  async clickTopUpPhoneButton(): Promise<void> {
    await this.topUpPhone.click();
  }
}
