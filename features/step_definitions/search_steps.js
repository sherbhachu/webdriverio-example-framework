import Homepage from "../page_objects/homepage";
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({And, But, Given, Then, When}) {
    Given(/^I search for "([^"]*)"$/, function (searchTerm) {
        Homepage.searchForTerm(searchTerm)
    });
    Then(/^I should see some search results returned$/, function () {
        expect(Homepage.getSearchSuggestions()).to.have.lengthOf.at.least(2);
    });

    Then(/^I should see no results returned$/, function () {
        browser.pause(1000);
        expect(Homepage.currentSearchSuggestions.isVisible()).to.be.false;
    });
});
