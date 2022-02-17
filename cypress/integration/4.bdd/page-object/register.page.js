export const registerPage = {
    url: '/register',
	get emailInput() {
		return cy.get('[name="email"]')
	},
	get passwordInput() {
		return cy.get('[name="password"]')
	},
    get confirmPasswordInput() {
		return cy.get('[name="confirmPassword"]')
	},
	get submitButton() {
		return cy.get('[type="submit"]')
	},
    alert(message) {
        return cy.contains('#email-feedback', message)
    }
}

export default registerPage
