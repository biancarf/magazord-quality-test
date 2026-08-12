const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: [
      "parte1-api/questao1.1/testes/**/*.spec.js",
      "parte2-e2e/questao2.1/testes/**/*.spec.js",
      "parte3-arquivos/questao3.1/testes/**/*.spec.js"
    ],
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000
  }
});
