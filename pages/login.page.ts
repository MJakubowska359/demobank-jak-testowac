import { LoginUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators for login form
  idInput = this.page.locator('#login_id');

  // Locators for assertions
  error = this.page.locator('.error');

  async pressEnterInIdField(): Promise<void> {
    await this.idInput.press('Enter');
  }

  async fillShortIdAndPressEnterInIdField(
    login: LoginUserModel,
  ): Promise<void> {
    await this.idInput.fill(login.id);
    await this.idInput.press('Enter');
  }
}
