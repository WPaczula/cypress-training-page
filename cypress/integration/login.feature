Feature: User login
    As a user
    I want to login to the page to access its content

    Scenario: Loggin in using correct credentials
        Given I open "/login" page
        When I provide valid credentials
        And I click submit button
        Then I am on the "/" page