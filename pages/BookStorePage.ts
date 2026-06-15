import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para a página da Book Store
 */
export class BookStorePage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly bookRows: Locator;
  readonly firstBookTitle: Locator;
  readonly noRowsMessage: Locator;

  constructor(page: Page) {
    this.page          = page;
    this.searchInput   = page.locator('#searchBox');
    this.bookRows      = page.locator('.rt-tbody .rt-tr-group').filter({ hasText: /\w/ });
    this.firstBookTitle = page.locator('.rt-tbody .rt-tr-group a').first();
    this.noRowsMessage = page.locator('.rt-noData');
  }

  async navigate() {
    await this.page.goto('/books');
    await this.page.waitForLoadState('networkidle');
  }

  async searchBook(title: string) {
    await this.searchInput.fill(title);
    // Aguarda o filtro ser aplicado
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    await this.searchInput.clear();
    await this.page.waitForTimeout(500);
  }

  async getBookCount(): Promise<number> {
    return await this.bookRows.count();
  }

  async assertBooksVisible() {
    await expect(this.bookRows.first()).toBeVisible();
  }

  async assertSearchResult(expectedTitle: string) {
    await expect(this.firstBookTitle).toContainText(expectedTitle);
  }

  async assertNoResults() {
    await expect(this.noRowsMessage).toBeVisible();
  }
}
