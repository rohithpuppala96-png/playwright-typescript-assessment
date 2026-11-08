@cart
Feature: Shopping cart

    @TC03_CartCalculation
    Scenario Outline: Cart unit prices, subtotals and total are calculated correctly
        Given The test fetches required data "<scenarioName>"
        And the user is on the home page
        When the user navigates to the shop page
        And the user adds the required products to the cart
        Then the cart count shows the total quantity added
        When the user navigates to the cart page
        Then the cart contains each product with the quantity added
        And each product's unit price matches the price shown in the shop
        And each product's subtotal equals unit price times quantity
        And the total equals the sum of all subtotals

        Examples:
            | scenarioName         |
            | TC03_CartCalculation |