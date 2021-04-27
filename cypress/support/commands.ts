import loginPage from "../page-object/login";

declare global {
  namespace Cypress {
    interface Chainable {
      login: () => void
    }
  }
}

Cypress.Commands.add("login", () => {
  loginPage.emailInput().type("test@user.com");
  loginPage.passwordInput().type("Password123");
  loginPage.loginButton().click();
});
