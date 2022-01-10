import editSavePage from "../../page-object/edit-save";

describe("Edit save", () => {
  beforeEach(() => {
    cy.visit("/1/edit-save");
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
        .should("have.length", initialLength + 1);
    });
  });

  it("should not change the number of emojis if cancel button is pressed", () => {
    editSavePage.emojis().its("length").as("initialLength");

    editSavePage.editButton().click();
    editSavePage.emojiIncreaseArrow().click();
    editSavePage.cancelButton().click();

    cy.get("@initialLength").then((initialLength) => {
      editSavePage.emojis().should("have.length", initialLength);
    });
  });
});
