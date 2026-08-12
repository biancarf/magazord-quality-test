class LoginPage {
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';

  visit() {
    cy.visit("/");

    return this;
  }

  login(username, password) {
    cy.get(this.usernameInput).clear().type(username);
    cy.get(this.passwordInput).clear().type(password, { log: false });
    cy.get(this.loginButton).click();

    return this;
  }
}

module.exports = new LoginPage();
