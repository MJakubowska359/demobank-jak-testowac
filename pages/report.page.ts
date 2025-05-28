/* eslint-disable no-console */
import { NameModel, PathModel } from '../models/file.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ReportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators for reports page
  lastYearReport = this.page.getByRole('button', {
    name: 'Pobierz raport z ostatniego roku',
  });
  uploadTextFileButton = this.page.locator('div #my_file_1');
  uploadJsonFileButton = this.page.locator('div #my_file_2');
  sendButton = this.page.getByRole('button', { name: 'Prześlij' });
  downloadTxtReportButton = this.page.getByRole('link', {
    name: 'Pobierz jako txt',
  });
  downloadZipReportButton = this.page.getByRole('link', {
    name: 'Pobierz jako zip',
  });
  downloadFolder = path.resolve('downloads/reports');

  // Locators for assertions
  header = this.page.getByRole('heading');
  firstValueInLastYearReport = this.page.locator('#value0');

  async clickDownloadReportForLastYearButton(): Promise<void> {
    await this.lastYearReport.click();
  }

  async uploadTextFile(file: PathModel): Promise<void> {
    await this.uploadTextFileButton.setInputFiles(file.path);
    await this.sendButton.first().click();
  }

  async uploadJsonFile(file: PathModel): Promise<void> {
    await this.uploadJsonFileButton.setInputFiles(file.path);
    await this.sendButton.nth(1).click();
  }

  async downloadReportAsTxtFile(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadTxtReportButton.click();
    const download = await downloadPromise;
    const filePath = path.join(
      this.downloadFolder,
      download.suggestedFilename(),
    );
    await download.saveAs(filePath);
  }

  async downloadReportAsZipFile(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadZipReportButton.click();
    const download = await downloadPromise;
    const filePath = path.join(
      this.downloadFolder,
      download.suggestedFilename(),
    );
    await download.saveAs(filePath);
  }

  async checkDownloadedReportAsTxtFile(report: NameModel): Promise<void> {
    try {
      const files = fs.readdirSync(this.downloadFolder);

      if (files.includes(report.name)) {
        console.log(`Znaleziono plik: ${report.name}`);
      } else {
        console.log(`Nie znaleziono pliku o nazwie: ${report.name}`);
        throw new Error(`Nie znaleziono pliku o nazwie: ${report.name}`);
      }
    } catch (error) {
      console.error(
        `Błąd podczas dostępu do folderu ${this.downloadFolder}:`,
        error,
      );
      throw error;
    }
  }

  async getReportHref(): Promise<string | null> {
    return this.page.getAttribute('#btn_dl_zip', 'href');
  }

  async checkDownloadedReportAsZipFile(report: NameModel): Promise<void> {
    try {
      const files = fs.readdirSync(this.downloadFolder);

      if (files.includes(report.name)) {
        console.log(`Znaleziono plik: ${report.name}`);
      } else {
        console.log(`Nie znaleziono pliku o nazwie: ${report.name}`);
        throw new Error(`Nie znaleziono pliku o nazwie: ${report.name}`);
      }
    } catch (error) {
      console.error(
        `Błąd podczas dostępu do folderu ${this.downloadFolder}:`,
        error,
      );
      throw error;
    }
  }
}
