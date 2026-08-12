# Teste QA Sênior - Magazord

Projeto de automação desenvolvido para o teste técnico de Qualidade, com foco em:

- testes de API;
- rate limiting e autenticação;
- reutilização e expiração de token;
- testes E2E de checkout;
- geração dinâmica de dados;
- testes de upload de arquivos;
- estratégia mobile;
- mocks e integrações;
- organização de automação, rastreabilidade e boas práticas.

## Tecnologias

- Node.js 18+
- Cypress
- JavaScript
- Git
- GitHub Actions (estrutura sugerida)
- Page Objects
- Helpers
- Fixtures

## Instalação

```bash
npm install
```

## Configuração

Copie `.env.example` para `.env` quando necessário.

No Cypress, variáveis de ambiente podem ser passadas pela linha de comando:

```bash
npx cypress run --env reqresApiKey=SUA_CHAVE
```

Também é possível definir a variável de ambiente no shell/CI.

> Observação importante sobre ReqRes: a API mudou desde a versão descrita originalmente no enunciado. Atualmente, a documentação oficial informa que as requisições exigem `x-api-key` e que o ambiente pode ser definido por `X-Reqres-Env`. Por isso o helper foi preparado para receber a chave sem armazená-la no código. O fluxo legado `/api/login` continua documentado pela plataforma, mas pode exigir a chave conforme a configuração atual.

## Execução

Todos os testes:

```bash
npm test
```

Por parte:

```bash
npm run test:parte1
npm run test:parte2
npm run test:parte3
```

Modo interativo:

```bash
npm run test:open
```

Chrome:

```bash
npm run test:chrome
```

## Estrutura

```text
magazord-quality-test/
├── README.md
├── package.json
├── cypress.config.js
├── .env.example
├── parte1-api/
│   └── questao1.1/
│       ├── RESPOSTA_TEORICA.md
│       └── testes/
│           ├── api.spec.js
│           └── utils/
│               └── api-helper.js
├── parte2-e2e/
│   └── questao2.1/
│       ├── RESPOSTA_TEORICA.md
│       └── testes/
│           ├── checkout-flow.spec.js
│           ├── pages/
│           │   ├── login-page.js
│           │   ├── products-page.js
│           │   ├── cart-page.js
│           │   └── checkout-page.js
│           └── fixtures/
│               └── checkout-data.js
├── parte3-arquivos/
│   └── questao3.1/
│       ├── RESPOSTA_TEORICA.md
│       └── testes/
│           ├── csv-upload.spec.js
│           ├── utils/
│           │   └── csv-generator.js
│           └── fixtures/
│               ├── valid.csv
│               ├── empty.csv
│               ├── invalid-format.csv
│               └── malformed.csv
├── parte4-mobile/
│   └── questao4.1/
│       └── RESPOSTA_TEORICA.md
├── parte5-mocks/
│   └── questao5.1/
│       └── RESPOSTA_TEORICA.md
└── casos-de-teste/
    └── CASOS_DE_TESTE.md
```

## Decisões técnicas

### Cypress

Foi escolhido por permitir cobrir API, E2E, geração de dados e validações em uma única stack, com baixa complexidade de setup.

### Page Objects

A camada de páginas separa localização de elementos e ações de negócio, reduzindo duplicação e facilitando manutenção.

### Helpers

Regras reutilizáveis, como autenticação, validação de rate limit e geração de CSV, ficam isoladas para evitar acoplamento dos testes.

### Dados dinâmicos

O checkout gera dados únicos por execução para reduzir dependência de massa fixa.

### Rate limiting

O teste live valida os headers retornados pela API. O cenário de limite excedido é validado de forma determinística por uma resposta simulada, pois consumir deliberadamente a cota pública de uma API compartilhada seria uma estratégia frágil e inadequada para CI.

### Limitações do ambiente de demonstração

O site The Internet disponibilizado pelo case possui um fluxo genérico de upload, mas não implementa um motor real de processamento/validação de CSV. Assim, a automação valida o upload e o nome do arquivo; as regras de conteúdo, duplicidade e relacionamento são tratadas na estratégia teórica e nos casos de teste.

## Qualidade e CI/CD

Em um projeto real, eu evoluiria esta suíte para:

1. lint e validação de sintaxe;
2. testes API rápidos em cada PR;
3. smoke E2E em cada PR;
4. regressão completa em execução agendada;
5. paralelização;
6. evidências de falha;
7. controle de flaky tests;
8. métricas de execução;
9. gates de qualidade;
10. integração com gestão de testes.

## Segurança

Nenhuma credencial deve ser armazenada no código. Tokens e chaves devem ser fornecidos por variáveis de ambiente/secret manager do CI.

## Observação sobre o enunciado

O repositório original do desafio apresenta ReqRes com um fluxo de autenticação legado. Como APIs públicas podem mudar, a implementação prioriza não quebrar a suíte por credenciais hardcoded e registra a decisão técnica no código e na documentação.
