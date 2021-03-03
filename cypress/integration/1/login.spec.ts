describe("Login", () => {
  it("should login the user if correct email and password are passed.", () => {
    cy.visit("http://localhost:3000/login");

    cy.login();

    cy.location("pathname").should("be.eq", "/");
  });
});
