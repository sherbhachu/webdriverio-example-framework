Feature: General Navigation

  As a user of the NAP website
  I would like to be able to navigate using the nav bar
  So that I can have a better and customised user experience

  Background:
    Given I am on the NAP Homepage

  Scenario: User is able to browse to a top level category
    Then I can choose the top level category of "CLOTHING"

  Scenario: User is able to browse to a secondary level directory
    Then I am able to visit the secondary level category for "JEWELRY" called "Rings"

  Scenario: User is able to set their locale/region
    When I set the country to be "Italy"
    Then I can see that the URL has updated to have "it" within it