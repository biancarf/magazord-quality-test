# Questão 4.1 — Automação Mobile

## 4.1.a) Ferramenta escolhida

Eu avaliaria principalmente Appium e Maestro.

### Appium

**Pontos fortes**
- ecossistema maduro;
- Android e iOS;
- ampla capacidade de interação com elementos nativos;
- boa integração com CI/CD;
- flexibilidade para cenários complexos.

**Pontos de atenção**
- setup mais complexo;
- maior custo de manutenção do ambiente;
- execução pode ser mais pesada.

### Maestro

**Pontos fortes**
- sintaxe simples;
- curva de aprendizado menor;
- produtividade alta para fluxos E2E;
- boa adequação para cenários orientados ao comportamento do usuário.

**Pontos de atenção**
- alguns cenários nativos muito específicos podem exigir outra abordagem;
- dependendo da profundidade de integração com recursos do dispositivo, pode haver limitações.

### Minha escolha

Para o cenário descrito, eu escolheria **Appium** como ferramenta principal, principalmente pela necessidade de trabalhar com geolocalização, câmera, notificações, armazenamento offline e sincronização, além da necessidade de manter uma estratégia Android/iOS.

Eu manteria Maestro como alternativa para uma camada rápida de smoke/regressão de fluxos críticos.

---

## 4.1.b) Mock de recursos

### Geolocalização

Usaria coordenadas controladas no emulador/simulador.

Cenários:

- localização permitida;
- localização negada;
- localização indisponível;
- dentro da área esperada;
- fora da área esperada.

### Câmera

Usaria imagem/arquivo controlado ou recurso virtual do dispositivo.

Cenários:

- captura válida;
- permissão negada;
- câmera indisponível;
- arquivo inválido.

### Push

Evitaria depender de um provedor real nos testes automatizados.

Usaria serviço/mock de push para controlar:

- payload;
- título;
- conteúdo;
- usuário destinatário;
- duplicidade;
- atraso;
- falha de entrega.

---

## 4.1.c) Android e iOS com baixa duplicação

Eu separaria:

### Camada de negócio

```text
login()
adicionarProduto()
sincronizarDados()
validarPedido()
```

### Camada de implementação

```text
Android
iOS
```

O fluxo de negócio seria compartilhado sempre que possível. Diferenças específicas de plataforma ficariam encapsuladas em adapters/page objects.

Também manteria identificadores de teste consistentes entre plataformas.

---

## 4.1.d) Setup local e CI/CD

### Local

1. Node.js;
2. Android Studio/SDK e/ou Xcode;
3. simulador/emulador;
4. Appium server/driver;
5. aplicação de teste;
6. configuração de capabilities;
7. execução da suíte.

### CI/CD

1. provisionar agente;
2. instalar dependências;
3. configurar SDK;
4. iniciar emulador/simulador;
5. instalar o app;
6. executar smoke;
7. executar regressão;
8. coletar screenshots/logs;
9. publicar resultados;
10. destruir ambiente.

Eu usaria execução paralela quando o volume justificar.

---

## 4.1.e) Offline e sincronização

Eu criaria cenários determinísticos:

```text
ONLINE
 ↓
alteração local
 ↓
OFFLINE
 ↓
nova alteração
 ↓
ONLINE
 ↓
sincronização
 ↓
validação
```

Validaria:

- persistência local;
- fila de eventos;
- reprocessamento;
- idempotência;
- duplicidade;
- conflito;
- ordem dos eventos;
- eventual consistência.

Para não depender de backend real, usaria mocks/stubs da API e controlaria a conectividade no dispositivo/emulador.
