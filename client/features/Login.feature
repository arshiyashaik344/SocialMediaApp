Feature: Login Page User Details

Scenario: The one where user tries LogIn with valid credentials
 Given user navigates to the login form page
    When user enters "arshiyas" in the userName field
    And user enters "arshi" in the Password field
    And user clicks on Login button
    Then posts page with userName "Arshiyas" appears

 