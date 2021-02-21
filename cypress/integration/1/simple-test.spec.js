import simpleTestSelectors from "../../selectors/simple-test";

describe("Simple test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/1/simple-test");
    cy.login();
  });

  it("should display welcome message for man with a name", () => {
    const name = "Jan";
    const gender = "Mężczyzna";

    simpleTestSelectors.genderSelect().select(gender);
    simpleTestSelectors.nameInput().type(name);
    simpleTestSelectors.sendButton().click();

    simpleTestSelectors.helloManToast(name).should("be.visible");
  });

  it("should display welcome message for man with a name", () => {
    const gender = "Kobieta";

    simpleTestSelectors.genderSelect().select(gender);
    simpleTestSelectors.sendButton().click();

    simpleTestSelectors.helloUnknownWomanToast().should("be.visible");
  });
});
