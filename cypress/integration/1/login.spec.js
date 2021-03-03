describe("Login", () => {
  it("should login the user if correct email and password are passed.", () => {
    cy.visit("/login");

    cy.login();

    cy.location("pathname").should("be.eq", "/");
  });
});
