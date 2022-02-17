import loginPage from "../page-object/login.page";
import homePage from "../page-object/home.page";
import registerPage from "../page-object/register.page";

const navigationDictionary = {
  login: loginPage.url,
  home: homePage.url,
  register: registerPage.url,
};

Given("I am on the {string} page", (nameOfThePage) => {
  cy.visit(navigationDictionary[nameOfThePage]);
});

Then("I should be on the {string} page", (nameOfThePage) => {
  cy.location("pathname").should("equal", navigationDictionary[nameOfThePage]);
});
