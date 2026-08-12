class ProductsPage {
  title = '[data-test="title"]';
  backpack = '[data-test="add-to-cart-sauce-labs-backpack"]';
  cartLink = '[data-test="shopping-cart-link"]';

  assertLoaded() {
    cy.get(this.title).should("contain", "Products");

    return this;
  }

  addBackpack() {
    cy.get(this.backpack).click();

    return this;
  }

  openCart() {
    cy.get(this.cartLink).click();

    return this;
  }
}

module.exports = new ProductsPage();
