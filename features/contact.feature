@contact
Feature: Contact form

    @TC01_ContactValidation
    Scenario Outline: Mandatory field validation errors are shown and then cleared
        Given The test fetches required data "<scenarioName>"
        And the user is on the home page
        When the user navigates to the contact page
        And the user submits the contact form without entering any data
        Then validation errors are shown for all mandatory fields
        When the user fills in all mandatory fields with valid data
        Then the validation errors are no longer displayed

        Examples:
            | scenarioName           |
            | TC01_ContactValidation |