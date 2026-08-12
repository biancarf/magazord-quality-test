class CartPage {
  title = '[data-test="title"]';
  checkoutButton = '[data-test="checkout"]';

  assertLoaded() {
    cy.get(this.title).should("contain", "Your Cart");

    return this;
  }

  assertBackpackAdded() {
    cy.get('[data-test="inventory-item-name"]')
      .should("contain", "Sauce Labs Backpack");

    return this;
  }

  checkout() {
    cy.get(this.checkoutButton).click();

    return this;
  }
}

module.exports = new CartPage();
