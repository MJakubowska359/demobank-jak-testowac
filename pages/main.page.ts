import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  extendSessionButton = this.page.getByRole('button', {
    name: 'przedluż sesję',
  });

  // Locators for assertions
  seconds = this.page.locator('#countdown_seconds');
  minutes = this.page.locator('#countdown_minutes');
  newMessage = this.page.locator('#show_messages');
}
