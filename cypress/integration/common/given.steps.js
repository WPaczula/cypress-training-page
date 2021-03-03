/// <reference types="cypress" />

import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I open {string} page", (pathname) => {
  cy.visit(`http://localhost:3000${pathname}`);
});
