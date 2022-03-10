Feature: Simple Flow of the Application

Scenario: The one where user logs in and creates the post
 Given user navigates to the login form page
    When user enters "arshiyas" in the userName field
    And user enters "arshi" in the Password field
    And user clicks on Login button
    Then posts page with userName "Arshiyas" appears
    When user creates a post named "Moon Light" 
    And user clicks on Submit button
    Then posts page gets updated with the new post "Moon Light"
    When user likes the post
    And user goes to the single post page
    And user comments on the post as "Delicious food"
    And user clicks on Submit button in comment form
    Then new comment "Delicious food" appears on the page
    