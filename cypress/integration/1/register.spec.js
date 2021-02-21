import registerSelectors from "../../selectors/register";

describe("Register", () => {
  it.skip("should register the user if the data is valid", () => {
    cy.visit("http://localhost:3000/register");

    registerSelectors.emailInput().type("test@user.com");
    registerSelectors.passwordInput().type("Password123");
    registerSelectors.confirmPasswordInput().type("Password123");
    registerSelectors.registerButton().click();

    cy.location("pathname").should("be.equal", "/");
  });
});
