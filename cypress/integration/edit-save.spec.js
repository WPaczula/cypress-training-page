import editSaveSelectors from "../selectors/edit-save";

describe("Edit save", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/1/edit-save");
    cy.login();
  });

  it("should increase number of emojis by 1 using arrow", () => {
    editSaveSelectors.emojis().its("length").as("initialLength");

    editSaveSelectors.editButton().click();
    editSaveSelectors.emojiIncreaseArrow().click();
    editSaveSelectors.notRobotCheckbox().check({ force: true });
    editSaveSelectors.saveButton().click();

    cy.get("@initialLength").then((initialLength) => {
      editSaveSelectors
        .emojis()
        .its("length")
        .should("equal", initialLength + 1);
    });
  });

  it("should not change the number of emojis if cancel button is pressed", () => {
    editSaveSelectors.emojis().its("length").as("initialLength");
    editSaveSelectors.emojis().invoke("text").as("initialEmojis");

    editSaveSelectors.editButton().click();
    editSaveSelectors.emojiIncreaseArrow().click();
    editSaveSelectors.cancelButton().click();

    cy.get("@initialLength").then((initialLength) => {
      editSaveSelectors.emojis().its("length").should("equal", initialLength);
    });
    cy.get("@initialEmojis").then((initialEmojis) => {
      editSaveSelectors
        .emojis()
        .invoke("text")
        .should("not.equal", initialEmojis);
    });
  });
});
