Feature: Filter Product Listings Page

  As a user of the NAP website
  I would like to be able to browse the website
  So that I can refine products based on filters

  Background:
    Given I am on the NAP Homepage

  Scenario: User is able browse for a specific Designer
    Given I can choose the top level category of "SHOES"
    When I select the designer "Altuzarra"
    Then The products listed should all have "Altuzarra" as the Designer

  Scenario: User is able browse using a specific Colour
    Given I can choose the top level category of "LINGERIE"
    And I capture the current number of results
    When I select the size "S"
    Then I should see fewer results returned

  Scenario: User is able browse using a specific Colour
    Given I can choose the top level category of "BEAUTY"
    And I capture the current number of results
    When I select the colour "Neutrals"
    Then I should see fewer results returned
