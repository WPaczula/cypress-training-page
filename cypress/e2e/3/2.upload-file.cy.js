import filePage from "../../page-object/file";
import Papa from "papaparse";

describe("Files", () => {
  beforeEach(() => {
    cy.visit("/pl/3/files");
    cy.login();
  });

  it("show uploaded file", () => {
    filePage
      .fileUploadInput()
      .attachFile("/files/users.csv", { subjectType: "drag-n-drop" });
    filePage.filePreviewButton().click();

    cy.readFile("cypress/fixtures/files/users.csv").then((file) => {
      const { data: users } = Papa.parse(file, { header: true });

      cy.wrap(users).each((user, index) => {
        cy.get("tbody").children().eq(index).children().as("currentRow");
        cy.get("@currentRow").eq(0).should("have.text", user.id);
        cy.get("@currentRow").eq(1).should("have.text", user.firstname);
        cy.get("@currentRow").eq(2).should("have.text", user.lastname);
        cy.get("@currentRow").eq(3).should("have.text", user.email);
      });
    });
  });
});
