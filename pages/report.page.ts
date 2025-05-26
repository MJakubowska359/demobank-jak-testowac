import { PathModel } from '../models/file.model';
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
  uploadTextFileButton = this.page.locator('div #my_file_1');
  sendButton = this.page.getByRole('button', { name: 'Prześlij' });

  // Locators for assertions
  firstValueInLastYearReport = this.page.locator('#value0');

  async clickDownloadReportForLastYearButton(): Promise<void> {
    await this.lastYearReport.click();
  }

  async uploadTextFile(file: PathModel): Promise<void> {
    await this.uploadTextFileButton.setInputFiles(file.path);
    await this.sendButton.first().click();
  }
}
