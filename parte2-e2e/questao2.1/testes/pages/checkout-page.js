class CheckoutPage {
  firstName = '[data-test="firstName"]';
  lastName = '[data-test="lastName"]';
  postalCode = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  finishButton = '[data-test="finish"]';
  confirmation = '[data-test="complete-header"]';

  fillCustomer(data) {
    cy.get(this.firstName).clear().type(data.firstName);
    cy.get(this.lastName).clear().type(data.lastName);
    cy.get(this.postalCode).clear().type(data.postalCode);

    return this;
  }

  continue() {
    cy.get(this.continueButton).click();

    return this;
  }

  finish() {
    cy.get(this.finishButton).click();

    return this;
  }

  assertConfirmation() {
    cy.get(this.confirmation)
      .should("be.visible")
      .and("contain", "Thank you for your order!");

    return this;
  }
}

module.exports = new CheckoutPage();
