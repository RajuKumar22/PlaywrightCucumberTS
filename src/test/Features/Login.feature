@Regression
Feature: Login to the site

    @SmokeTesting
    Scenario: Verify user is able to login to the site successfully
        When Launch the website URL
        Given User enters username and password "Raju Kumar" and "Rajput@65328"
        When User clicks on login btn
        Then Verify user is logged in successfully

    Scenario: Verify user is not able to login to the site with Invalid credentials
        When Launch the website URL
        Given User enters username and password "Raju" and "Rajput@65328"
        When User clicks on login btn
        Then Verify user is not logged in successfully

    Scenario Outline: Verify user is able to login or not to the site with examples keyword
        When Launch the website URL
        Given User enters username and password "<Username>" and "<Password>"
        When User clicks on login btn
        Then Verify user is able or not logged in successfully "<Username>"

        Examples:
            | Username   | Password     |
            | Raju Kumar | Rajput@65328 |
            | Raju       | Rajput@65328 |

    Scenario: Verify user is able to add product to cart
        Given User enters username and password "Raju Kumar" and "Rajput@65328"
        When User clicks on login btn
        When User adds product to the cart
        Then Verify product is added to the cart successfully


