import { test, expect } from '@playwright/test';
import { getAllBooks, getBookByIsbn } from '../../utils/apiHelpers';
import { BOOKS, HTTP_STATUS } from '../../fixtures/testData';

/**
 * Suite de testes de API — Book Store
 *
 * Testa os endpoints de livros: listagem e busca por ISBN.
 * Demonstra: validação de schema, testes de contrato, loops em testes.
 */
test.describe('API — Book Store', () => {

  test.describe('GET /BookStore/v1/Books - Listagem de Livros', () => {
    test('CT-API-008 | Deve retornar status 200 ao buscar todos os livros', async ({ request }) => {
      const { status } = await getAllBooks(request);
      expect(status).toBe(HTTP_STATUS.OK);
    });

    test('CT-API-009 | Response deve conter array de livros não vazio', async ({ request }) => {
      const { body } = await getAllBooks(request);

      expect(body).toHaveProperty('books');
      expect(Array.isArray(body.books)).toBe(true);
      expect(body.books.length).toBeGreaterThan(0);
    });

    test('CT-API-010 | Cada livro deve ter os campos obrigatórios do contrato', async ({ request }) => {
      const { body } = await getAllBooks(request);
      const books = body.books;

      // Valida o schema de TODOS os livros (não só o primeiro)
      books.forEach((book: Record<string, unknown>, index: number) => {
        expect(book, `Livro no índice ${index} não tem campo 'isbn'`).toHaveProperty('isbn');
        expect(book, `Livro no índice ${index} não tem campo 'title'`).toHaveProperty('title');
        expect(book, `Livro no índice ${index} não tem campo 'author'`).toHaveProperty('author');
        expect(book, `Livro no índice ${index} não tem campo 'publisher'`).toHaveProperty('publisher');
        expect(book, `Livro no índice ${index} não tem campo 'pages'`).toHaveProperty('pages');
        expect(book, `Livro no índice ${index} não tem campo 'website'`).toHaveProperty('website');
      });
    });

    test('CT-API-011 | Todos os livros devem ter ISBN não vazio', async ({ request }) => {
      const { body } = await getAllBooks(request);

      body.books.forEach((book: Record<string, unknown>) => {
        expect(typeof book.isbn).toBe('string');
        expect((book.isbn as string).length).toBeGreaterThan(0);
      });
    });

    test('CT-API-012 | Todos os livros devem ter número de páginas positivo', async ({ request }) => {
      const { body } = await getAllBooks(request);

      body.books.forEach((book: Record<string, unknown>) => {
        expect(book.pages).toBeGreaterThan(0);
      });
    });

    test('CT-API-013 | Deve retornar pelo menos 8 livros', async ({ request }) => {
      const { body } = await getAllBooks(request);
      expect(body.books.length).toBeGreaterThanOrEqual(8);
    });
  });

  test.describe('GET /BookStore/v1/Book - Busca por ISBN', () => {
    test('CT-API-014 | Deve retornar livro correto ao buscar por ISBN válido', async ({ request }) => {
      const { status, body } = await getBookByIsbn(request, BOOKS.existing.isbn);

      expect(status).toBe(HTTP_STATUS.OK);
      expect(body.isbn).toBe(BOOKS.existing.isbn);
      expect(body.title).toBe(BOOKS.existing.title);
    });

    test('CT-API-015 | Deve retornar schema completo para livro existente', async ({ request }) => {
      const { body } = await getBookByIsbn(request, BOOKS.existing.isbn);

      expect(body).toHaveProperty('isbn');
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('subTitle');
      expect(body).toHaveProperty('author');
      expect(body).toHaveProperty('publish_date');
      expect(body).toHaveProperty('publisher');
      expect(body).toHaveProperty('pages');
      expect(body).toHaveProperty('description');
      expect(body).toHaveProperty('website');
    });

    test('CT-API-016 | Deve retornar 400 ao buscar ISBN inválido', async ({ request }) => {
      const { status } = await getBookByIsbn(request, 'ISBN-INVALIDO-000');
      expect(status).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    test('CT-API-017 | Author do livro deve corresponder ao esperado', async ({ request }) => {
      const { body } = await getBookByIsbn(request, BOOKS.existing.isbn);
      expect(body.author).toBe(BOOKS.existing.author);
    });

    test('CT-API-018 | Publisher do livro deve corresponder ao esperado', async ({ request }) => {
      const { body } = await getBookByIsbn(request, BOOKS.existing.isbn);
      expect(body.publisher).toBe(BOOKS.existing.publisher);
    });
  });
});
