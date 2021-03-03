/// <reference types="cypress" />

import { When } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../page-object/login";

When("I provide valid credentials", () => {
  loginPage.emailInput().type("test@user.com");
  loginPage.passwordInput().type("Password123");
});

When("I click submit button", () => {
  loginPage.loginButton().click();
});
