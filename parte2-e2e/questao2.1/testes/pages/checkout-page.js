class CheckoutPage {
  firstName = '[data-test="firstName"]';
  lastName = '[data-test="lastName"]';
  postalCode = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  finishButton = '[data-test="finish"]';
  confirmation = '[data-test="complete-header"]';
  overview = '[data-test="checkout-summary-container"]';
  errorMessage = '[data-test="error"]';

  fillCustomer(data) {
    cy.get(this.firstName).clear().type(data.firstName);
    cy.get(this.lastName).clear().type(data.lastName);
    cy.get(this.postalCode).clear().type(data.postalCode);

    return this;
  }

  clearFirstName() {
    cy.get(this.firstName).clear();

    return this;
  }

  clearLastName() {
  cy.get(this.lastName).clear();

  return this;
}

  clearPostalCode() {
  cy.get(this.postalCode).clear();

  return this;
}

  continue() {
    cy.get(this.continueButton).click();

    return this;
  }

   assertLastNameRequired() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .and("contain", "Last Name is required");

    return this;
}

   assertPostalCodeRequired() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .and("contain", "Postal Code is required");

   return this;
}

  assertOverviewLoaded() {
    cy.get(this.overview).should("be.visible");

    return this;
  }

  assertFirstNameRequired() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .and("contain", "First Name is required");

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
