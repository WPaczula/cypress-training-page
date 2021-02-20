import simulatingErrorsSelectors from "../selectors/simulating-errors";

describe("Simulating errors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/1/simulating-errors");
    cy.login();
  });

  it("should show information if blik failed due to not found phone number", () => {
    cy.intercept("POST", "/api/blik", {
      fixture: "simulating-errors/not-found.json",
      statusCode: 404,
    }).as("notFound");
    const phone = "123-123-123";

    simulatingErrorsSelectors.ammountInput().type(50);
    simulatingErrorsSelectors.phoneInput().type(phone);
    simulatingErrorsSelectors.sendButton().click();
    cy.wait("@notFound");

    cy.contains(
      `Nie udało się znaleźć odbiorcy o numerze telefonu ${phone}`
    ).should("be.visible");
  });

  it("should show information if blik failed due to lack of funds", () => {
    cy.intercept("POST", "/api/blik", {
      fixture: "simulating-errors/lack-of-funds.json",
      statusCode: 403,
    }).as("lackOfFunds");
    const amount = 50;

    simulatingErrorsSelectors.ammountInput().clear().type(amount);
    simulatingErrorsSelectors.phoneInput().type("123-123-123");
    simulatingErrorsSelectors.sendButton().click();
    cy.wait("@lackOfFunds");

    cy.contains(
      `Nie udało się przesłać ${amount}PLN z uwagi na brak środków na koncie`
    ).should("be.visible");
  });
});
