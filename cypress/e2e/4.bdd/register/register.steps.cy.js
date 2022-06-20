/// <reference types="cypress" />
import { Then, When } from "cypress-cucumber-preprocessor/steps";
import registerPage from '../page-object/register.page'

When('I create a new user', () => {
    registerPage.emailInput.type('new-test@user.com')
    registerPage.passwordInput.type('Password123')
    registerPage.confirmPasswordInput.type('Password123')
    registerPage.submitButton.click()
})

When(`I don't provide email as login`, (dataTable) => {
	const {username} = dataTable.hashes()[0]
    registerPage.emailInput.type(username)
    registerPage.passwordInput.type('Password123')
    registerPage.confirmPasswordInput.type('Password123')
	registerPage.submitButton.click()
})

Then('I should see {string} error message', (errorMessage) => {
	registerPage.alert(errorMessage).should('be.visible')
})