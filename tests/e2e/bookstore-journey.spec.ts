import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/BookStorePage';
import { getAllBooks } from '../../utils/apiHelpers';
import { BOOKS } from '../../fixtures/testData';

/**
 * Suite de testes E2E — Fluxos Completos (End-to-End)
 *
 * Combina chamadas de API com interações de UI para simular
 * jornadas reais de usuário. Este é o diferencial do portfólio:
 * mostra que você pensa além do teste unitário.
 *
 * Padrão usado: API + UI (usa API para setup/verificação, UI para fluxo)
 */
test.describe('E2E — Jornadas do Usuário na Book Store', () => {

  test('CT-E2E-001 | Usuário pesquisa e visualiza detalhes de um livro', async ({ page, request }) => {
    /**
     * Cenário:
     * 1. Verificar via API que o livro existe no sistema
     * 2. Navegar até a Book Store via UI
     * 3. Buscar o livro pelo título
     * 4. Verificar que o resultado aparece corretamente
     */

    // PASSO 1: Pré-condição via API — garante que o livro existe antes de testar a UI
    const { body: apiResponse } = await getAllBooks(request);
    const bookExists = apiResponse.books.some(
      (book: Record<string, unknown>) => book.isbn === BOOKS.existing.isbn,
    );
    expect(bookExists, 'Pré-condição falhou: livro não encontrado via API').toBe(true);

    // PASSO 2: Navega para a Book Store via UI
    const bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();
    await bookStorePage.assertBooksVisible();

    // PASSO 3: Realiza busca pelo título
    await bookStorePage.searchBook(BOOKS.existing.title);

    // PASSO 4: Valida resultado na UI
    await bookStorePage.assertSearchResult(BOOKS.existing.title);
    const count = await bookStorePage.getBookCount();
    expect(count).toBeGreaterThan(0);
  });

  test('CT-E2E-002 | Contagem de livros na UI é consistente com a API', async ({ page, request }) => {
    /**
     * Cenário de consistência de dados:
     * Garante que o número de livros exibidos na UI bate com o que a API retorna.
     * Este tipo de teste detecta bugs de integração entre backend e frontend.
     */

    // Conta via API
    const { body } = await getAllBooks(request);
    const totalBooksApi = body.books.length;

    // Conta via UI
    const bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();
    const totalBooksUI = await bookStorePage.getBookCount();

    // Valida consistência
    expect(totalBooksUI).toBe(totalBooksApi);
  });

  test('CT-E2E-003 | Busca por livro inexistente mostra estado vazio corretamente', async ({ page }) => {
    /**
     * Cenário de estado vazio:
     * Valida que a UX de "sem resultados" funciona corretamente,
     * tanto visualmente quanto sem erros no console.
     */
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();
    await bookStorePage.searchBook(BOOKS.nonExistent.title);
    await bookStorePage.assertNoResults();

    // Garante que não há erros de JavaScript no console durante o fluxo
    expect(consoleErrors.length).toBe(0);
  });

  test('CT-E2E-004 | Fluxo completo de busca e limpeza de filtro', async ({ page }) => {
    /**
     * Cenário de navegação:
     * Testa o ciclo completo: buscar → ver resultado → limpar → ver catálogo completo.
     */
    const bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();

    // Estado inicial: catálogo completo
    const initialCount = await bookStorePage.getBookCount();
    expect(initialCount).toBeGreaterThan(0);

    // Aplica filtro
    await bookStorePage.searchBook(BOOKS.existing.title);
    const filteredCount = await bookStorePage.getBookCount();
    expect(filteredCount).toBeLessThan(initialCount);

    // Remove filtro
    await bookStorePage.clearSearch();
    const finalCount = await bookStorePage.getBookCount();

    // Catálogo deve voltar ao estado original
    expect(finalCount).toBe(initialCount);
  });
});
