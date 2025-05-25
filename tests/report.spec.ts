import { LoginPage } from '../pages/login.page';
import { NavPage } from '../pages/nav.page';
import { ReportPage } from '../pages/report.page';
import { correctLogin } from '../test-data/login_data';
import { expect, test } from '@playwright/test';

test.describe('Check reports', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let reportPage: ReportPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navPage = new NavPage(page);
    reportPage = new ReportPage(page);

    await page.goto('/');
    await loginPage.login(correctLogin);
    await navPage.clickReportBookmark();
  });

  test(
    'Should not be able to top-up phone if required fields of form are empty',
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
});
