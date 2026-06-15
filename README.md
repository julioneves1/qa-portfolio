# QA Portfolio — Automação de Testes com Playwright

Projeto de automação de testes desenvolvido para demonstrar habilidades em **Quality Assurance**, cobrindo testes de **UI**, **API** e fluxos **End-to-End (E2E)** com Playwright e TypeScript.

> **Site testado:** [DemoQA](https://demoqa.com) — plataforma pública criada especificamente para treino e demonstração de automação de testes.

---

## O que este projeto demonstra

- ✅ **Page Object Model (POM)** — separação de responsabilidades, código reutilizável e fácil manutenção
- ✅ **Testes de UI** — interações com a interface, validações visuais e de comportamento
- ✅ **Testes de API** — validação de contratos, status HTTP e schema de responses
- ✅ **Testes E2E** — fluxos completos combinando UI + API
- ✅ **Boas práticas de QA** — nomenclatura clara (CT-UI-001), dados centralizados, sem magic strings
- ✅ **TypeScript** — tipagem estática para código mais seguro e legível
- ✅ **Relatórios HTML** — evidências de execução geradas automaticamente

---

## Estrutura do Projeto

```
qa-portfolio/
├── tests/
│   ├── ui/                    # Testes de interface (front-end)
│   │   ├── login.spec.ts      # Autenticação — 9 casos de teste
│   │   └── bookstore.spec.ts  # Catálogo de livros — 9 casos de teste
│   ├── api/                   # Testes de API (back-end)
│   │   ├── auth.spec.ts       # Endpoints de token — 7 casos de teste
│   │   └── books.spec.ts      # Endpoints de livros — 11 casos de teste
│   └── e2e/                   # Fluxos End-to-End
│       └── bookstore-journey.spec.ts  # Jornadas completas — 4 casos de teste
├── pages/                     # Page Objects (padrão POM)
│   ├── LoginPage.ts
│   └── BookStorePage.ts
├── fixtures/
│   └── testData.ts            # Dados de teste centralizados
├── utils/
│   └── apiHelpers.ts          # Funções reutilizáveis de API
├── reports/                   # Relatórios de execução (gerado automaticamente)
├── playwright.config.ts       # Configuração central do Playwright
└── tsconfig.json
```

---

## Casos de Teste

### UI — Login (9 testes)
| ID | Cenário | Tipo |
|---|---|---|
| CT-UI-001 | Página de login carrega corretamente | Positivo |
| CT-UI-002 | Campos de credenciais aceitam digitação | Positivo |
| CT-UI-003 | Campo de senha oculta o texto | Segurança |
| CT-UI-004 | Credenciais inválidas não fazem login | Negativo |
| CT-UI-005 | Usuário vazio não faz login | Negativo |
| CT-UI-006 | Senha vazia não faz login | Negativo |
| CT-UI-007 | Campos vazios não fazem login | Negativo |
| CT-UI-008 | Navegação por Tab entre campos | Acessibilidade |
| CT-UI-009 | Submissão com Enter funciona | UX |

### UI — Book Store (9 testes)
| ID | Cenário | Tipo |
|---|---|---|
| CT-UI-010 | Catálogo exibe livros ao carregar | Positivo |
| CT-UI-011 | Campo de busca está visível e habilitado | Positivo |
| CT-UI-012 | Catálogo tem pelo menos 8 livros | Positivo |
| CT-UI-013 | Busca filtra por título | Positivo |
| CT-UI-014 | Busca sem resultado exibe estado vazio | Negativo |
| CT-UI-015 | Limpar busca restaura catálogo | Positivo |
| CT-UI-016 | Busca é case-insensitive | Positivo |
| CT-UI-017 | Busca parcial encontra livros | Positivo |
| CT-UI-018 | Catálogo exibe em viewport mobile | Responsividade |

### API — Autenticação (7 testes)
| ID | Cenário | Validação |
|---|---|---|
| CT-API-001 | Token retorna status 200 | Status HTTP |
| CT-API-002 | Response tem campos obrigatórios | Schema/Contrato |
| CT-API-003 | Token é string não vazia | Tipo de dado |
| CT-API-004 | Credencial inválida retorna token null | Negativo |
| CT-API-005 | Senha errada retorna token null | Negativo |
| CT-API-006 | Usuário em branco retorna token null | Negativo |
| CT-API-007 | Content-Type é application/json | Headers |

### API — Livros (11 testes)
| ID | Cenário | Validação |
|---|---|---|
| CT-API-008 | Listagem retorna status 200 | Status HTTP |
| CT-API-009 | Response tem array de livros não vazio | Schema |
| CT-API-010 | Cada livro tem todos os campos obrigatórios | Contrato |
| CT-API-011 | Todos os ISBNs são strings não vazias | Tipo de dado |
| CT-API-012 | Número de páginas é positivo | Regra de negócio |
| CT-API-013 | Catálogo tem pelo menos 8 livros | Regra de negócio |
| CT-API-014 | Busca por ISBN retorna livro correto | Positivo |
| CT-API-015 | Schema completo do livro está correto | Contrato |
| CT-API-016 | ISBN inválido retorna 400 | Negativo |
| CT-API-017 | Author bate com o esperado | Dados |
| CT-API-018 | Publisher bate com o esperado | Dados |

### E2E — Jornadas Completas (4 testes)
| ID | Cenário | Destaque |
|---|---|---|
| CT-E2E-001 | Busca livro via API e confirma na UI | API + UI |
| CT-E2E-002 | Contagem de livros é consistente entre API e UI | Integração |
| CT-E2E-003 | Busca inexistente não gera erros no console | UX + Qualidade |
| CT-E2E-004 | Ciclo buscar → ver resultado → limpar → catálogo | Fluxo completo |

**Total: 40 casos de teste**

---

## Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/julioneves1/qa-portfolio.git
cd qa-portfolio

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install
```

### Execução

```bash
# Todos os testes
npm test

# Apenas testes de UI
npm run test:ui

# Apenas testes de API
npm run test:api

# Apenas testes E2E
npm run test:e2e

# Com interface visual do browser
npm run test:headed

# Abrir relatório HTML
npm run test:report
```

---

## Relatórios

Após a execução, o relatório HTML é gerado em `reports/html-report/`. Ele inclui:
- Status de cada teste (passou/falhou)
- Tempo de execução
- Screenshots automáticos em caso de falha
- Vídeo da execução (em caso de falha)
- Trace para depuração

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.44 | Framework de automação |
| [TypeScript](https://www.typescriptlang.org/) | ^5.0 | Linguagem |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |

---

## Padrões e Decisões Técnicas

### Por que Page Object Model?
O POM separa os seletores e ações de cada página dos casos de teste. Se um seletor mudar, você atualiza em um único arquivo, não em 20 testes.

### Por que centralizar dados de teste?
Evita "magic strings" espalhadas. Se o ISBN de um livro mudar, há um único lugar para atualizar.

### Por que combinar API + UI nos testes E2E?
Fluxos E2E puros de UI são lentos e frágeis. Usar a API para setup e verificação torna os testes mais rápidos, confiáveis e próximos do que acontece em ambientes reais.

### Por que TypeScript?
Tipagem estática evita erros em tempo de desenvolvimento, melhora o autocomplete e torna o código mais legível para times.

---

## Sobre

Projeto desenvolvido como parte da transição de carreira para a área de **Quality Assurance**. O foco nesse projeto foi demonstrar raciocínio de testador: identificar cenários positivos, negativos, de borda, de acessibilidade e de consistência de dados.

e-mail [dev.jneves@gmail.com]
Linkedin [linkedin.com/in/julio-neves-it/]
Github [github.com/julioneves1]
