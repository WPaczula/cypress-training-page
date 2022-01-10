const editSavePage = {
  emojis: () =>
    cy
      .contains(/Twoje emoji/)
      .next()
      .children(),
  newEmojis: () =>
    cy
      .contains(/Twoje emoji/)
      .next()
      .children()
      .children(),
  editButton: () => cy.contains('[type="button"]', "Edytuj"),
  emojiIncreaseArrow: () =>
    cy.get('[name="numberOfEmojis"]').next().children().eq(0),
  notRobotCheckbox: () => cy.get('[name="isNotARobot"]'),
  saveButton: () => cy.get('[type="submit"]'),
  cancelButton: () => cy.contains('[type="button"]', "Anuluj"),
};

export default editSavePage;
