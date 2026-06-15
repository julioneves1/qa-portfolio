import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '../fixtures/testData';

/**
 * Utilitários de API — funções reutilizáveis para chamadas HTTP
 *
 * Encapsular chamadas de API em helpers evita duplicação de código
 * e facilita mudanças futuras.
 */

interface UserPayload {
  userName: string;
  password: string;
}

interface BookPayload {
  userId: string;
  collectionOfIsbns: { isbn: string }[];
}

/**
 * Cria um novo usuário via API
 */
export async function createUser(request: APIRequestContext, payload: UserPayload) {
  const response = await request.post(`${API_ENDPOINTS.base}${API_ENDPOINTS.createUser}`, {
    data: payload,
  });
  return {
    response,
    body: await response.json(),
    status: response.status(),
  };
}

/**
 * Gera um token de autenticação para o usuário
 */
export async function generateToken(request: APIRequestContext, payload: UserPayload) {
  const response = await request.post(`${API_ENDPOINTS.base}${API_ENDPOINTS.login}`, {
    data: payload,
  });
  const body = await response.json();
  return {
    response,
    body,
    status: response.status(),
    token: body.token as string | null,
  };
}

/**
 * Busca todos os livros disponíveis
 */
export async function getAllBooks(request: APIRequestContext) {
  const response = await request.get(`${API_ENDPOINTS.base}${API_ENDPOINTS.getBooks}`);
  return {
    response,
    body: await response.json(),
    status: response.status(),
  };
}

/**
 * Busca um livro específico por ISBN
 */
export async function getBookByIsbn(request: APIRequestContext, isbn: string) {
  const response = await request.get(`${API_ENDPOINTS.base}${API_ENDPOINTS.getBook}`, {
    params: { ISBN: isbn },
  });
  return {
    response,
    body: await response.json(),
    status: response.status(),
  };
}

/**
 * Adiciona livro à coleção do usuário (requer autenticação)
 */
export async function addBookToCollection(
  request: APIRequestContext,
  token: string,
  payload: BookPayload,
) {
  const response = await request.post(`${API_ENDPOINTS.base}${API_ENDPOINTS.addBook}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });
  return {
    response,
    body: await response.json(),
    status: response.status(),
  };
}
