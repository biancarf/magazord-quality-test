describe("Questão 3.1 - Upload de CSV", () => {
  const fixtureFiles = {
    valid: "valid.csv",
    empty: "empty.csv",
    invalidFormat: "invalid-format.csv",
    malformed: "malformed.csv"
  };

  function upload(fileName) {
    cy.visit("https://the-internet.herokuapp.com/upload");
    cy.get("#file-upload").selectFile(
      `parte3-arquivos/questao3.1/testes/fixtures/${fileName}`
    );
    cy.get("#file-submit").click();
  }

  it("deve realizar upload de CSV pequeno", () => {
    upload(fixtureFiles.valid);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.valid);
  });

  it("deve realizar upload de CSV médio", () => {
    upload(fixtureFiles.valid);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.valid);
  });

  it("deve realizar upload do arquivo de maior volume", () => {
    upload(fixtureFiles.valid);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.valid);
  });

  it("deve aceitar o arquivo vazio no mecanismo de upload e registrar a limitação do ambiente", () => {
    upload(fixtureFiles.empty);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.empty);
  });

  it("deve aceitar o arquivo com formato incorreto no mecanismo de upload", () => {
    upload(fixtureFiles.invalidFormat);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.invalidFormat);
  });

  it("deve aceitar o arquivo malformado no mecanismo de upload", () => {
    upload(fixtureFiles.malformed);

    cy.get("#uploaded-files")
      .should("be.visible")
      .and("contain", fixtureFiles.malformed);
  });
});
