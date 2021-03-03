import simpleTestPage from "../../page-object/simple-test";

describe("Simple test", () => {
  beforeEach(() => {
    cy.visit("/1/simple-test");
    cy.login();
  });

  it("should display welcome message for man with a name", () => {
    const name = "Jan";
    const gender = "Mężczyzna";

    simpleTestPage.genderSelect().select(gender);
    simpleTestPage.nameInput().type(name);
    simpleTestPage.sendButton().click();

    simpleTestPage.helloManToast(name).should("be.visible");
  });

  it("should display welcome message for man with a name", () => {
    const gender = "Kobieta";

    simpleTestPage.genderSelect().select(gender);
    simpleTestPage.sendButton().click();

    simpleTestPage.helloUnknownWomanToast().should("be.visible");
  });
});
