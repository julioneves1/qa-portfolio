import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para a página de Login
 *
 * O padrão POM separa a lógica de interação com a UI dos testes em si,
 * tornando o código mais reutilizável e fácil de manter.
 */
export class LoginPage {
  readonly page: Page;

  // Locators — centralizar seletores aqui é uma boa prática de QA
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loggedInUsername: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput    = page.locator('#userName');
    this.passwordInput    = page.locator('#password');
    this.loginButton      = page.locator('#login');
    this.errorMessage     = page.locator('#name');
    this.loggedInUsername = page.locator('#userName-value');
    this.logoutButton     = page.locator('#submit');
  }

  /** Navega para a página de login */
  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Realiza o login com as credenciais fornecidas */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Verifica se o usuário está logado */
  async assertLoggedIn(expectedUsername: string) {
    await expect(this.loggedInUsername).toBeVisible();
    await expect(this.loggedInUsername).toHaveText(expectedUsername);
  }

  /** Verifica se o erro de login está visível */
  async assertLoginError(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
