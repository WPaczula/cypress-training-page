export default {
  downloadButton() {
    return cy.contains("a", "Pobierz");
  },
  fileUploadInput() {
    return cy.get("#file");
  },
  filePreviewButton() {
    return cy.contains("button", "Podgląd");
  },
};
