const registerPage = {
  emailInput: () => cy.get('[name="email"]'),
  passwordInput: () => cy.get('[name="password"]'),
  confirmPasswordInput: () => cy.get('[name="confirmPassword"]'),
  registerButton: () => cy.get('[type="submit"]'),
};

export default registerPage;
