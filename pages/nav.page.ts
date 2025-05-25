import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class NavPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for bookmarks
  topUpPhoneBookmark = this.page.getByRole('link', {
    name: 'doładowanie telefonu',
  });
  reportsBookmark = this.page.getByRole('link', { name: 'raporty' });

  async clickTopUpPhoneBookmark(): Promise<void> {
    await this.topUpPhoneBookmark.click();
  }

  async clickReportBookmark(): Promise<void> {
    await this.reportsBookmark.first().click();
  }
}
