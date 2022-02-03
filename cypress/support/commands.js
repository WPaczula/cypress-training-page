import loginPage from "../page-object/login";
import "cypress-file-upload";

Cypress.Commands.add("login", () => {
  loginPage.emailInput().type("test@user.com");
  loginPage.passwordInput().type("Password123");
  loginPage.loginButton().click();
});
