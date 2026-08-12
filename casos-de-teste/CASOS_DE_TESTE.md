# Casos de Teste — Teste Técnico Magazord

## Parte 1 — API

| ID | Cenário | Tipo | Resultado esperado |
|---|---|---|---|
| API-001 | Consultar usuário do GitHub | Positivo | HTTP 200 e dados do usuário |
| API-002 | Validar X-RateLimit-Limit | Contrato | Header presente e numérico |
| API-003 | Validar X-RateLimit-Remaining | Contrato | Header presente e valor >= 0 |
| API-004 | Validar X-RateLimit-Reset | Contrato | Header presente e timestamp válido |
| API-005 | Detectar rate limit excedido | Negativo | HTTP 403/429 e remaining = 0 |
| API-006 | Realizar login | Positivo | Token retornado |
| API-007 | Reutilizar token válido | Positivo | Requisição autenticada executada |
| API-008 | Detectar token expirado | Negativo | Token identificado como expirado |
| API-009 | Renovar autenticação após expiração | Resiliência | Novo token obtido sem loop infinito |

## Parte 2 — E2E

| ID | Cenário | Tipo | Resultado esperado |
|---|---|---|---|
| E2E-001 | Login com usuário válido | Positivo | Usuário acessa produtos |
| E2E-002 | Adicionar produto ao carrinho | Positivo | Produto aparece no carrinho |
| E2E-003 | Abrir checkout | Positivo | Formulário de checkout exibido |
| E2E-004 | Preencher dados dinâmicos | Dados | Dados aceitos |
| E2E-005 | Finalizar pedido | E2E | Pedido concluído |
| E2E-006 | Validar confirmação | E2E | Mensagem de confirmação exibida |
| E2E-007 | Limpar cookies | Isolamento | Próxima execução inicia limpa |
| E2E-008 | Limpar localStorage | Isolamento | Estado anterior não interfere |

## Parte 3 — Arquivos

| ID | Cenário | Tipo | Resultado esperado |
|---|---|---|---|
| CSV-001 | Gerar 10 linhas | Massa | Arquivo criado corretamente |
| CSV-002 | Gerar 100 linhas | Massa | Arquivo criado corretamente |
| CSV-003 | Gerar 1000 linhas | Volume | Arquivo criado corretamente |
| CSV-004 | Upload válido | Positivo | Upload realizado |
| CSV-005 | Upload vazio | Negativo | Sistema deve tratar conforme regra |
| CSV-006 | Formato incorreto | Negativo | Sistema deve rejeitar conforme regra |
| CSV-007 | Dados malformados | Negativo | Registros inválidos identificados |
| CSV-008 | Validar contagem processada | Integridade | Quantidade processada conciliada |
| CSV-009 | Validar duplicidades | Regra de negócio | Duplicidades tratadas |
| CSV-010 | Validar relacionamentos | Regra de negócio | Relacionamentos inconsistentes tratados |

## Observação

Os IDs foram definidos para permitir rastreabilidade entre requisito, cenário, automação e resultado esperado.
