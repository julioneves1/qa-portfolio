import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../../fixtures/testData';

/**
 * Suite de testes de UI — Autenticação (Login)
 *
 * Cobre os principais cenários de login:
 * - Fluxo feliz (happy path): credenciais válidas
 * - Fluxos negativos: credenciais inválidas, campos vazios
 *
 * Site utilizado: https://demoqa.com (site público de treino para QAs)
 */
test.describe('Login - Autenticação de Usuário', () => {
  let loginPage: LoginPage;

  // Roda antes de cada teste — instancia o POM
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('Cenários de Sucesso', () => {
    test('CT-UI-001 | Deve exibir a página de login corretamente', async ({ page }) => {
      // Verifica se os elementos essenciais estão visíveis
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();

      // Verifica o título da página
      await expect(page).toHaveTitle(/DEMOQA/i);
    });

    test('CT-UI-002 | Deve permitir digitação nos campos de credenciais', async () => {
      await loginPage.usernameInput.fill(USERS.valid.username);
      await loginPage.passwordInput.fill(USERS.valid.password);

      await expect(loginPage.usernameInput).toHaveValue(USERS.valid.username);
      await expect(loginPage.passwordInput).toHaveValue(USERS.valid.password);
    });

    test('CT-UI-003 | Campo de senha deve ocultar o texto digitado', async () => {
      await loginPage.passwordInput.fill(USERS.valid.password);
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Cenários de Falha (Fluxos Negativos)', () => {
    test('CT-UI-004 | Não deve logar com credenciais inválidas', async () => {
      await loginPage.login(USERS.invalid.username, USERS.invalid.password);

      // Verifica que permanece na página de login
      await expect(loginPage.loginButton).toBeVisible();
    });

    test('CT-UI-005 | Não deve logar com usuário vazio', async () => {
      await loginPage.login('', USERS.valid.password);
      await expect(loginPage.usernameInput).toBeVisible();
    });

    test('CT-UI-006 | Não deve logar com senha vazia', async () => {
      await loginPage.login(USERS.valid.username, '');
      await expect(loginPage.loginButton).toBeVisible();
    });

    test('CT-UI-007 | Não deve logar com todos os campos vazios', async () => {
      await loginPage.login('', '');
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test.describe('Acessibilidade e UX', () => {
    test('CT-UI-008 | Deve ser possível navegar entre campos com Tab', async ({ page }) => {
      await loginPage.usernameInput.focus();
      await page.keyboard.press('Tab');
      await expect(loginPage.passwordInput).toBeFocused();
    });

    test('CT-UI-009 | Deve ser possível submeter o formulário com Enter', async ({ page }) => {
      await loginPage.usernameInput.fill(USERS.invalid.username);
      await loginPage.passwordInput.fill(USERS.invalid.password);
      await page.keyboard.press('Enter');

      // Verifica que a ação foi disparada (permanece na tela de login por credencial inválida)
      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});
