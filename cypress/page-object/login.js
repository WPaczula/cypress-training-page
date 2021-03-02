export default {
  emailInput: () => cy.get('[name="email"]'),
  passwordInput: () => cy.get('[name="password"]'),
  loginButton: () => cy.get('[type="submit"]'),
};
