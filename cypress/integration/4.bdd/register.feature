Feature: Register new account
    As a User
    I want to be able to create an account
    To be able to use the application

    Scenario: Create an account
        Given I am on the "register" page
        When I create a new user
        Then I should be on the "home" page

    @focus
    Scenario: Error handling for incorrect email
        Given I am on the "register" page
        When I don't provide email as login
            | username              |
            | not-email |
        Then I should be on the "register" page
        And I should see "Email is not valid" error message