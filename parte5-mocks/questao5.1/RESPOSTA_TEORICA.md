# Questão 5.1 — Mocks e Integrações

## 5.1.a) Testar integrações sem afetar marketplaces reais

Eu separaria os ambientes:

```text
QA
 ↓
Mock/Sandbox Marketplace
 ↓
Validação

Produção
 ↓
Marketplace real
```

No ambiente de QA, não usaria credenciais reais nem endpoints de produção.

Quando o marketplace oferecer sandbox oficial, eu utilizaria o sandbox para testes de integração. Para cenários de erro que o sandbox não permita reproduzir, usaria mock.

---

## 5.1.b) Estratégia de mock

Eu utilizaria uma solução como WireMock ou MSW, dependendo da camada:

### MSW

Boa opção para interceptar chamadas da aplicação e controlar respostas durante testes.

### WireMock

Boa opção quando quero uma camada de mock mais próxima de um servidor externo, especialmente em testes de integração e CI.

Para este cenário, eu escolheria **WireMock** para uma arquitetura de integração mais próxima do comportamento de um marketplace externo, mantendo MSW como alternativa para testes mais rápidos da aplicação.

Os mocks seriam versionados e teriam cenários identificáveis:

```text
marketplace-success
marketplace-500
marketplace-timeout
marketplace-429
marketplace-invalid-payload
```

---

## 5.1.c) 500, timeout e 429

### HTTP 500

Simularia erro interno do marketplace.

Validaria:

- retry controlado;
- logging;
- mensagem;
- não duplicar pedido;
- fallback quando aplicável.

### Timeout

Simularia ausência de resposta dentro do timeout configurado.

Validaria:

- timeout correto;
- retry;
- backoff;
- limite máximo de tentativas;
- circuit breaker, se existir.

### HTTP 429

Simularia rate limit.

Validaria:

- leitura de `Retry-After`, quando disponível;
- backoff;
- não continuar disparando requisições;
- persistência da operação;
- retomada posterior.

---

## 5.1.d) Schema validation

Eu validaria o payload contra um contrato versionado usando JSON Schema ou OpenAPI.

Exemplo conceitual:

```text
Request
 ↓
Schema validation
 ↓
API
 ↓
Response
 ↓
Schema validation
```

A validação entraria no pipeline:

- testes de contrato;
- testes de integração;
- smoke de API;
- regressão de APIs críticas.

Também validaria tipos, obrigatoriedade, enumerações, formatos e campos adicionais quando o contrato exigir.

---

## 5.1.e) Mock x Contract Testing

### Mock

Responde:

> "Como meu sistema se comporta quando o parceiro retorna determinado cenário?"

É excelente para:

- 500;
- 429;
- timeout;
- payload inválido;
- respostas específicas.

### Contract Testing

Responde:

> "Meu consumidor e meu provider continuam compatíveis?"

É importante para evitar que uma alteração do marketplace quebre a integração sem que percebamos.

### Quando usar

Eu usaria os dois.

```text
Unit/API tests
    ↓
Mocks

Integration
    ↓
Mocks + Sandbox

Contract
    ↓
Contrato Consumer/Provider

E2E
    ↓
Fluxos críticos
```

Mock e contract testing não são substitutos. Eles resolvem problemas diferentes.
