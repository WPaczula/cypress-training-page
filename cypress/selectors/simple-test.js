const simpleTestSelectors = {
  genderSelect: () => cy.get('[name="gender"]'),
  nameInput: () => cy.get('[name="name"]'),
  sendButton: () => cy.get('[type="submit"]'),
  helloManToast: (name) =>
    cy.contains(`Witaj ${name}! Cieszę się, że wysłałeś ten formularz!`),
  helloUnknownWomanToast: () =>
    cy.contains(
      "Cześć tajemnicza nieznajoma! Cieszę się że wysłałaś ten formularz!"
    ),
};

export default simpleTestSelectors;
