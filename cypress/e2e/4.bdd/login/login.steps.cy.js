/// <reference types="cypress" />
import { When } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../page-object/login.page";

When("I provide correct credentials", () => {
  loginPage.emailInput.type("test@user.com");
  loginPage.passwordInput.type("Password123");
  loginPage.loginButton.click();
});

When("I should see {string} error message", (message) => {
  loginPage.alert(message).should("be.visible");
});

When("I provide incorrect credentials", (dataTable) => {
  const { username, password } = dataTable.hashes()[0];
  loginPage.emailInput.type(username);
  loginPage.passwordInput.type(password);
  loginPage.loginButton.click();
});
