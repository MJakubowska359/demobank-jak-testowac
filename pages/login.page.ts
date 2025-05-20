/* eslint-disable playwright/no-wait-for-timeout */
import { LoginUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for login form
  idInput = this.page.locator('#login_id');
  nextButton = this.page.getByRole('button', { name: 'dalej' });
  passwordInput = this.page.locator('#login_password');
  loginButton = this.page.getByRole('button', { name: 'zaloguj się' });
  logoutButton = this.page.locator('#log_out');

  // Locators for assertions
  error = this.page.locator('.error');
  userName = this.page.locator('#user_name');
  header = this.page.getByRole('heading');

  async pressEnterInIdField(): Promise<void> {
    await this.idInput.press('Enter');
  }

  async fillShortIdAndPressEnterInIdField(
    login: LoginUserModel,
  ): Promise<void> {
    await this.idInput.fill(login.id);
    await this.idInput.press('Enter');
  }

  async pressEnterInPasswordField(login: LoginUserModel): Promise<void> {
    await this.idInput.pressSequentially(login.id);
    await this.nextButton.click();
    await this.page.waitForTimeout(2000);
    await this.passwordInput.press('Tab');
  }

  async fillShortPasswordAndPressEnterInPasswordField(
    login: LoginUserModel,
  ): Promise<void> {
    await this.idInput.pressSequentially(login.id);
    await this.nextButton.click();
    await this.page.waitForTimeout(2000);
    await this.passwordInput.pressSequentially(login.password);
    await this.passwordInput.press('Tab');
  }

  async login(login: LoginUserModel): Promise<void> {
    await this.idInput.pressSequentially(login.id);
    await this.nextButton.click();
    await this.page.waitForTimeout(2000);
    await this.passwordInput.pressSequentially(login.password);
    await this.loginButton.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }
}
