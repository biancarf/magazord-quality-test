# Questão 1.1 — Testes de API

## 1.1.a) Rate limiting

Eu estruturaria os testes em três níveis:

### 1. Validação do contrato

Para uma chamada bem-sucedida, validaria:

- status HTTP esperado;
- existência de `X-RateLimit-Limit`;
- existência de `X-RateLimit-Remaining`;
- existência de `X-RateLimit-Reset`;
- coerência entre limite e quantidade restante;
- `X-RateLimit-Reset` como timestamp válido.

### 2. Limite excedido

Não considero adequado consumir deliberadamente a cota de uma API pública compartilhada para provocar o bloqueio. Em um ambiente controlado, eu faria uma sequência de requisições até atingir o limite ou usaria um stub/mock que reproduza o contrato de rate limit.

O cenário deve validar:

- HTTP 403 ou 429 conforme o contrato;
- `X-RateLimit-Remaining = 0`, quando aplicável;
- respeito ao `Retry-After`, se fornecido;
- uso do `X-RateLimit-Reset` para determinar quando uma nova tentativa é permitida;
- ausência de loop infinito de retries.

### 3. Resiliência

No cliente da aplicação, eu verificaria:

- backoff exponencial para limites secundários;
- quantidade máxima de tentativas;
- logging;
- observabilidade;
- mensagem adequada para o consumidor;
- não continuar disparando requisições enquanto o cliente está limitado.

A estratégia evita transformar um problema de rate limit em uma avalanche de novas requisições.

---

## 1.1.b) Obter e reutilizar token

Eu centralizaria a autenticação em um helper.

O fluxo seria:

```text
Teste
  ↓
Existe token em cache?
  ↓
Sim → ainda válido?
  ↓
Sim → reutiliza
  ↓
Não → autentica novamente
```

A estrutura de cache deve armazenar pelo menos:

- token;
- instante de obtenção;
- instante estimado de expiração.

Em CI, eu evitaria compartilhar estado entre jobs independentes. O cache pode existir dentro de uma execução de suíte, mas cada job deve ter seu próprio contexto de autenticação.

Também não colocaria token no código-fonte.

---

## 1.1.c) Token expirado

Eu não faria o teste depender de esperar fisicamente dois minutos.

Criaria uma abstração de validade do token e utilizaria um TTL curto no teste, permitindo simular a expiração de forma determinística.

Quando o token estiver expirado:

1. o cliente tenta a requisição;
2. recebe 401/403 conforme o contrato;
3. identifica que o problema está relacionado à autenticação;
4. invalida o token em cache;
5. autentica novamente;
6. repete a operação somente uma vez;
7. se falhar novamente, propaga o erro.

É importante limitar o retry para não mascarar defeitos de autenticação.

---

## Decisões

A implementação separa:

- teste live do contrato da API;
- helper de autenticação;
- validação determinística do cenário de rate limit excedido;
- simulação de expiração.

Essa separação reduz flakiness e evita depender de condições externas não controláveis.
