# Questão 2.1 — Checkout

## 2.1.a) Cupom válido diferente por execução

Eu evitaria depender de um cupom fixo compartilhado entre execuções.

Em um sistema real, eu preferiria uma das alternativas:

1. API/endpoint de dados de teste para criar cupons;
2. banco de dados de teste com massa isolada;
3. fixture provisionada por execução;
4. prefixo único associado ao run ID;
5. serviço de dados de teste.

O importante é garantir isolamento entre execuções e limpeza posterior.

No SauceDemo utilizado neste case não existe o domínio completo de cupons descrito no contexto. Por isso não inventei uma funcionalidade que o ambiente de demonstração não possui. A estratégia está documentada para um sistema real.

---

## 2.1.b) Confirmação sem depender de e-mail real

Eu validaria a confirmação através de uma fonte determinística do próprio sistema:

- página de confirmação;
- status do pedido;
- ID do pedido;
- API de pedidos;
- banco de dados em ambiente de teste.

O e-mail seria tratado como uma integração separada.

Se o requisito for validar o disparo do e-mail, usaria um servidor SMTP de teste ou ferramenta como MailHog/Mailpit, evitando caixas reais.

---

## Estratégia E2E

O fluxo principal é:

```text
Login
 ↓
Adicionar produto
 ↓
Carrinho
 ↓
Checkout
 ↓
Dados do comprador
 ↓
Finalizar
 ↓
Confirmação do pedido
```

A automação usa Page Objects para separar comportamento de negócio da localização dos elementos.

Os dados de checkout são gerados por execução para reduzir dependência de massa fixa.
