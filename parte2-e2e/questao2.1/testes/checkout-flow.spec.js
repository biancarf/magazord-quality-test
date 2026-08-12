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

  it("E2E-001 - Checkout completo com dados dinâmicos", () => {
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
      .assertOverviewLoaded()
      .finish()
      .assertConfirmation();
  });

  it("E2E-002 - Checkout sem First Name deve apresentar validação", () => {
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
      .clearFirstName()
      .continue()
      .assertFirstNameRequired();
  });

it("E2E-003 - Checkout sem Last Name deve apresentar validação", () => {
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
    .clearLastName()
    .continue()
    .assertLastNameRequired();
});
it("E2E-004 - Checkout sem Postal Code deve apresentar validação", () => {
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
    .clearPostalCode()
    .continue()
    .assertPostalCodeRequired();
});
});
