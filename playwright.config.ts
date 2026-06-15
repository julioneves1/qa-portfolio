import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Diretório onde os testes estão localizados
  testDir: './tests',

  // Executar testes em paralelo
  fullyParallel: true,

  // Parar a execução se houver falha no CI
  forbidOnly: !!process.env.CI,

  // Número de tentativas em caso de falha
  retries: process.env.CI ? 2 : 0,

  // Número de workers paralelos
  workers: process.env.CI ? 1 : undefined,

  // Configuração de relatórios
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/test-results.json' }],
  ],

  // Configurações globais para todos os testes
  use: {
    // URL base da aplicação - usaremos o site de demo público
    baseURL: 'https://demoqa.com',

    // Capturar screenshot apenas em caso de falha
    screenshot: 'only-on-failure',

    // Gravar vídeo apenas em caso de falha
    video: 'retain-on-failure',

    // Gravar trace para depuração
    trace: 'on-first-retry',

    // Tempo máximo para cada ação (em ms)
    actionTimeout: 10_000,

    // Tempo máximo para navegação
    navigationTimeout: 30_000,
  },

  projects: [
    // Testes de API — sem browser
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://demoqa.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    },

    // Testes de UI — Chromium (desktop)
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },

    // Testes E2E — fluxos completos
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },

    // Testes mobile (diferencial no portfólio!)
    {
      name: 'mobile-chrome',
      testDir: './tests/ui',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
