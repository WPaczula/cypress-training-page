import filePage from "../../page-object/file";
import path from "path";
import Papa from "papaparse";

describe("Files", () => {
  beforeEach(() => {
    cy.visit("/3/files");
    cy.login();
  });

  it("should download the cypress image", () => {
    filePage.downloadButton().click();

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, "cypress.jpg")).should("exist");
  });

  it("should read the file", () => {
    cy.readFile("./cypress/fixtures/files/users.csv").then((file) => {
      const { data: users } = Papa.parse(file, { header: true });
      expect(users).to.have.length(5);

      cy.wrap(users).each((user) => {
        cy.wrap(user).as("user");
        cy.get("@user").its("id").should("not.be.undefined");
        cy.get("@user").its("firstname").should("not.be.undefined");
        cy.get("@user").its("lastname").should("not.be.undefined");
        cy.get("@user").its("email").should("not.be.undefined");
      });
    });
  });
});
