export const loginPage = {
    url: '/login',
	get emailInput() {
		return cy.get('[name="email"]')
	},
	get passwordInput() {
		return cy.get('[name="password"]')
	},
	get loginButton() {
		return cy.contains('[type="submit"]', 'Log in')
	},
    alert(message) {
        return cy.contains('[role=alert]', message)
    }
}

export default loginPage
