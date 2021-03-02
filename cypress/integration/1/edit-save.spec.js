import editSavePage from "../../page-object/edit-save";

describe("Edit save", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/1/edit-save");
    cy.login();
  });

  it("should increase number of emojis by 1 using arrow", () => {
    editSavePage.emojis().its("length").as("initialLength");

    editSavePage.editButton().click();
    editSavePage.emojiIncreaseArrow().click();
    editSavePage.notRobotCheckbox().check({ force: true });
    editSavePage.saveButton().click();

    cy.get("@initialLength").then((initialLength) => {
      editSavePage
        .emojis()
        .its("length")
        .should("equal", initialLength + 1);
    });
  });

  it("should not change the number of emojis if cancel button is pressed", () => {
    editSavePage.emojis().its("length").as("initialLength");
    editSavePage.emojis().invoke("text").as("initialEmojis");

    editSavePage.editButton().click();
    editSavePage.emojiIncreaseArrow().click();
    editSavePage.cancelButton().click();

    cy.get("@initialLength").then((initialLength) => {
      editSavePage.emojis().its("length").should("equal", initialLength);
    });
    cy.get("@initialEmojis").then((initialEmojis) => {
      editSavePage.emojis().invoke("text").should("not.equal", initialEmojis);
    });
  });
});
