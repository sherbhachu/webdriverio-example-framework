Feature: Search

  As a potential customer
  I would like to be able to search for products
  So that I can reduce my browsing time

  Background:
    Given I am on the NAP Homepage

  Scenario Outline:
    Given I search for "<search_term>"
    Then I should see some search results returned

    Examples:
      | search_term |
      | Guc         |
      | Prad        |


  Scenario: User is not shown any search results when entering a non existent product/item/brand
    Given I search for "er"
    Then I should see no results returned

