const loginPage = require("./pages/login-page");
const productsPage = require("./pages/products-page");
const cartPage = require("./pages/cart-page");
const checkoutPage = require("./pages/checkout-page");
const { generateCheckoutData } = require("./fixtures/checkout-data");

describe("Questão 2.1 - Checkout", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("deve realizar o fluxo completo de checkout com dados dinâmicos", () => {
    const customer = generateCheckoutData();

    loginPage
      .visit()
      .login("standard_user", "secret_sauce");

    productsPage
      .assertLoaded()
      .addBackpack()
      .openCart();

    cartPage
      .assertLoaded()
      .assertBackpackAdded()
      .checkout();

    checkoutPage
      .fillCustomer(customer)
      .continue()
      .finish()
      .assertConfirmation();
  });
});
