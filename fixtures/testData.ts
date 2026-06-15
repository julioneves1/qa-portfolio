/**
 * Dados de teste centralizados (Test Data / Fixtures)
 *
 * Centralizar dados evita "magic strings" espalhadas nos testes
 * e facilita manutenção — se algo mudar, você altera em um só lugar.
 */

export const USERS = {
  valid: {
    username: 'testuser_portfolio',
    password: 'Test@1234',
    firstName: 'Test',
    lastName: 'User',
    userId: '',
  },
  invalid: {
    username: 'usuario_invalido',
    password: 'senhaerrada',
  },
  emptyCredentials: {
    username: '',
    password: '',
  },
} as const;

export const BOOKS = {
  existing: {
    title: 'Git Pocket Guide',
    isbn: '9781449325862',
    author: 'Richard E. Silverman',
    publisher: "O'Reilly Media",
  },
  nonExistent: {
    title: 'Livro Que Não Existe XYZ123',
  },
} as const;

export const API_ENDPOINTS = {
  base: 'https://demoqa.com',
  createUser:   '/Account/v1/User',
  login:        '/Account/v1/GenerateToken',
  getUser:      '/Account/v1/User',
  deleteUser:   '/Account/v1/User',
  getBooks:     '/BookStore/v1/Books',
  getBook:      '/BookStore/v1/Book',
  addBook:      '/BookStore/v1/Books',
  deleteBook:   '/BookStore/v1/Book',
} as const;

export const HTTP_STATUS = {
  OK:           200,
  CREATED:      201,
  NO_CONTENT:   204,
  BAD_REQUEST:  400,
  UNAUTHORIZED: 401,
  NOT_FOUND:    404,
} as const;

export const ERROR_MESSAGES = {
  invalidLogin:    'Invalid username or password!',
  userNotFound:    'User not found!',
  userExists:      'User exists!',
  tokenRequired:   'User not authorized!',
} as const;
