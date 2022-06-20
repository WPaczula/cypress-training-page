import registerPage from "../../page-object/register";

describe("Register", () => {
  it.skip("should register the user if the data is valid", () => {
    cy.visit("/register");

    registerPage.emailInput().type("test@user.com");
    registerPage.passwordInput().type("Password123");
    registerPage.confirmPasswordInput().type("Password123");
    registerPage.registerButton().click();

    cy.location("pathname").should("be.equal", "/");
  });
});
