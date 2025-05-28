import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { NavPage } from '../pages/nav.page';
import { ReportPage } from '../pages/report.page';
import {
  downloadedTxtReport,
  downloadedZipReport,
  jsonFile,
  jsonFileName,
  textFile,
  textFileName,
} from '../test-data/file_data';
import { correctLogin } from '../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Check reports', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let reportPage: ReportPage;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navPage = new NavPage(page);
    reportPage = new ReportPage(page);
    mainPage = new MainPage(page);

    await page.goto('/');
    await loginPage.login(correctLogin);
    await navPage.clickReportBookmark();
  });

  test(
    'Should be able to show report for last year',
    { tag: ['@report', '@smoke'] },
    async () => {
      // Arrange
      const expectedFirstValueInReport = '543';

      // Act
      await reportPage.clickDownloadReportForLastYearButton();

      // Assert
      await expect(reportPage.firstValueInLastYearReport).toHaveText(
        expectedFirstValueInReport,
      );
    },
  );

  test(
    'Should be able to upload text file',
    { tag: ['@report', '@smoke'] },
    async () => {
      // Arrange
      const fileName = textFileName.name;
      const expectedMessage = `Plik przesłany! ${fileName}`;

      // Act
      await reportPage.uploadTextFile(textFile);

      // Assert
      await expect(mainPage.newMessage).toHaveText(expectedMessage);
    },
  );

  test(
    'Should be able to upload json file',
    { tag: ['@report', '@smoke'] },
    async () => {
      // Arrange
      const fileName = jsonFileName.name;
      const expectedMessage = `Plik przesłany! ${fileName}`;

      // Act
      await reportPage.uploadJsonFile(jsonFile);

      // Assert
      await expect(mainPage.newMessage).toHaveText(expectedMessage);
    },
  );

  test(
    'Should be able to download report as text file',
    { tag: ['@report', '@smoke'] },
    async () => {
      // Arrange
      const expectedHeader = 'Raport półroczny';

      // Act
      await expect(reportPage.header.nth(1)).toHaveText(expectedHeader);
      await reportPage.downloadReportAsTxtFile();

      // Assert
      await reportPage.checkDownloadedReportAsTxtFile(downloadedTxtReport);
    },
  );

  test(
    'Should be able to download report as zip file',
    { tag: ['@report', '@smoke'] },
    async () => {
      // Arrange
      const expectedReportName = 'report-1.zip';

      // Act
      const reportAttribute = await reportPage.getReportHref();
      expect(reportAttribute).toContain(expectedReportName);
      await reportPage.downloadReportAsZipFile();

      // Assert
      await reportPage.checkDownloadedReportAsZipFile(downloadedZipReport);
    },
  );
});
