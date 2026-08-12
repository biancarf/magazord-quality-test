# Questão 3.1 — Importação de CSV

## 3.1.a) Como validar 1000 linhas

Eu validaria a massa por contagem e por integridade.

A estratégia seria:

1. gerar um arquivo com 1000 registros conhecidos;
2. guardar o total esperado;
3. executar o upload;
4. validar o processamento;
5. comparar quantidade recebida, processada, rejeitada e duplicada;
6. validar registros representativos;
7. validar relacionamentos;
8. validar que não houve perda ou duplicação silenciosa.

Quando a aplicação fornecer esses indicadores, uma regra útil é:

```text
recebidos = processados + rejeitados
```

e, quando aplicável:

```text
processados = válidos - duplicados
```

Também considero importante validar dados nas bordas, não apenas contar linhas.

---

## 3.1.b) Cenários de erro

Eu separaria os erros em categorias:

### Arquivo

- vazio;
- extensão incorreta;
- encoding inválido;
- delimitador incorreto;
- header ausente;
- quantidade de colunas incorreta.

### Registro

- campo obrigatório vazio;
- e-mail inválido;
- idade inválida;
- tipo de dado incorreto;
- tamanho excedido;
- caracteres inválidos.

### Regra de negócio

- duplicidade;
- relacionamento inexistente;
- entidade inativa;
- conflito de dados.

### Resultado esperado

O sistema deve:

- rejeitar o arquivo/registro quando aplicável;
- informar o motivo;
- não gravar dados parcialmente de forma inconsistente;
- permitir rastrear os registros rejeitados;
- gerar logs suficientes para diagnóstico.

---

## Limitação do site do case

O The Internet disponibilizado no desafio fornece um formulário de upload, mas não um processamento real de CSV com regras de negócio. Por isso a automação prática valida o comportamento de upload, enquanto a estratégia de processamento é demonstrada teoricamente.
