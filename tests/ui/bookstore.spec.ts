import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/BookStorePage';
import { BOOKS } from '../../fixtures/testData';

/**
 * Suite de testes de UI — Book Store
 *
 * Testa a funcionalidade de catálogo e busca de livros.
 * Demonstra: uso de POM, assertions variadas, boas práticas de nomenclatura.
 */
test.describe('Book Store - Catálogo de Livros', () => {
  let bookStorePage: BookStorePage;

  test.beforeEach(async ({ page }) => {
    bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();
  });

  test.describe('Exibição do Catálogo', () => {
    test('CT-UI-010 | Deve exibir livros ao carregar a página', async () => {
      await bookStorePage.assertBooksVisible();

      const count = await bookStorePage.getBookCount();
      expect(count).toBeGreaterThan(0);
    });

    test('CT-UI-011 | Deve exibir o campo de busca', async () => {
      await expect(bookStorePage.searchInput).toBeVisible();
      await expect(bookStorePage.searchInput).toBeEnabled();
    });

    test('CT-UI-012 | Deve exibir pelo menos 8 livros no catálogo', async () => {
      const count = await bookStorePage.getBookCount();
      expect(count).toBeGreaterThanOrEqual(8);
    });
  });

  test.describe('Funcionalidade de Busca', () => {
    test('CT-UI-013 | Deve filtrar livros pelo título', async () => {
      await bookStorePage.searchBook(BOOKS.existing.title);
      await bookStorePage.assertSearchResult(BOOKS.existing.title);
    });

    test('CT-UI-014 | Deve exibir mensagem quando não há resultados', async () => {
      await bookStorePage.searchBook(BOOKS.nonExistent.title);
      await bookStorePage.assertNoResults();
    });

    test('CT-UI-015 | Deve restaurar catálogo ao limpar a busca', async () => {
      // Busca um livro
      await bookStorePage.searchBook(BOOKS.existing.title);
      const countFiltered = await bookStorePage.getBookCount();

      // Limpa a busca
      await bookStorePage.clearSearch();
      const countAll = await bookStorePage.getBookCount();

      // Catálogo completo deve ter mais livros que o filtrado
      expect(countAll).toBeGreaterThan(countFiltered);
    });

    test('CT-UI-016 | Busca deve ser case-insensitive', async () => {
      const titleUppercase = BOOKS.existing.title.toUpperCase();
      await bookStorePage.searchBook(titleUppercase);

      const count = await bookStorePage.getBookCount();
      expect(count).toBeGreaterThan(0);
    });

    test('CT-UI-017 | Deve encontrar livro buscando por parte do título', async () => {
      // Busca por apenas uma palavra do título
      const partialTitle = BOOKS.existing.title.split(' ')[0];
      await bookStorePage.searchBook(partialTitle);

      const count = await bookStorePage.getBookCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Responsividade', () => {
    test('CT-UI-018 | Deve exibir o catálogo em viewport mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await bookStorePage.navigate();
      await bookStorePage.assertBooksVisible();
    });
  });
});
