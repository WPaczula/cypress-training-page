const simpleTestPage = {
	genderSelect() {
		return cy.get('[name="gender"]')
	},
	nameInput() {
		return cy.get('[name="name"]')
	},
	sendButton() {
		return cy.get('[type="submit"]')
	},
	helloManToast(name) {
		return cy.contains(`Witaj ${name}! Cieszę się, że wysłałeś ten formularz!`)
	},
}

describe('Simple test', () => {
	beforeEach(() => {
		cy.visit('/2/simple-test')
		cy.login()
	})

	it('should display welcome message for man with a name', () => {
		const name = 'Jan'
		const gender = 'M'

		simpleTestPage.genderSelect().select(gender)
		simpleTestPage.nameInput().type(name)
		simpleTestPage.sendButton().click()

		simpleTestPage.helloManToast(name).should('be.visible')
	})
})
