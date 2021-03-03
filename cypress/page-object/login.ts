export default {
  emailInput: () => cy.findByLabelText('Email'),
  passwordInput: () => cy.findByLabelText('Password'),
  loginButton: () => cy.contains('button[type="submit"]', 'Log in'),
};

