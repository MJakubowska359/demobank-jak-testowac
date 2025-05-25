import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ReportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators for reports page
  lastYearReport = this.page.getByRole('button', {
    name: 'Pobierz raport z ostatniego roku',
  });

  // Locators for assertions
  firstValueInLastYearReport = this.page.locator('#value0');

  async clickDownloadReportForLastYearButton(): Promise<void> {
    await this.lastYearReport.click();
  }
}
