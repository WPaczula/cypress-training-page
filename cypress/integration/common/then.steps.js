/// <reference types="cypress" />

import { Then } from "cypress-cucumber-preprocessor/steps";

Then("I am on the {string} page", (pathname) => {
  cy.location("pathname").should("equal", pathname);
});
