Feature: Recommendations

  As a user of the NAP website
  I would like to be shown recommendations as I browse
  So that I might purchase products I may not have explicitly wanted

  Background:
    Given I am on the NAP Homepage

  @pending
  Scenario: User is shown HOW TO WEAR IT recommendations
    When I can choose the top level category of "CLOTHING"
    And I choose to purchase a product from the designer "PRADA"
    Then I should see product recommendations within HOW TO WEAR IT

