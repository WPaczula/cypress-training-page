// 🐼 Cypress zawiera wbudowaną ogromną liczbę asercji. Poza tym automatycznie wywołuje swoje wbudowane
// checki podczas wywoływania metod. Dla przykładu metoda click() sprawdzi, czy element jest wyrenderowany
// i nic go na pewno nie przesłania. Asercje można wywołać na dwa sposoby:

// ================================== METODA SHOULD =========================================

// 🐼 Metoda should przyjmuje dwa parametry - predykat i opcjonalnie wartość. Poniżej znajduje się parę opcji,
// więcej podpowie ci vs code po załadowaniu typów

cy.should("equal", 5);
cy.should("be.visible");
cy.should("be.disabled");
cy.should("not.be.greaterThan", 5);
cy.should("have.text", "text");
cy.should("have.length", 5);

// ================================= METODA EXPECT ==========================================

// 🐼 Czasami może się zdarzyć, że wywołanie asercji nie będzie bezpośrednio połączone z łańcuchem wywołań rozpoczynanym
// od cy. Wtedy można użyć metody expect. Ma ona trochę inną deklarację, ponieważ przyjmuje wartość, którą chcemy sprawdzić.
// Następnie po kropce można znaleźć odpowiedniki z metody should

expect(value).to.equal(5);
expect(element).to.be.visible();
expect(element).to.be.disabled();
expect(value).not.to.be.greaterThan(5);
expect(element).to.have.text("text");
expect(array).to.have.length(5);
