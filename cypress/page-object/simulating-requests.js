const simulatingRequestsPage = {
  ammountInput: () => cy.get('[name="amount"]'),
  phoneInput: () => cy.get('[name="phone"]'),
  sendButton: () => cy.get('[type="submit"]'),
};

export default simulatingRequestsPage;
