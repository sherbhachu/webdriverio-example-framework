import Homepage from "../page_objects/homepage";
import ProductListingsPage from "../page_objects/product_listings_page";
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({And, But, Given, Then, When}) {
    Then(/^I can see that the URL has updated to have "([^"]*)" within it$/, function (urlString,) {
        expect(browser.getUrl()).to.include("/" + urlString + "/")
    });

    When(/^I set the country to be "([^"]*)"$/, function (country) {
        Homepage.setCountryTo(country);
    });

    Then(/^I can choose the top level category of "([^"]*)"$/, function (topLevelCategory) {
        Homepage.selectTopLevelMenuItem(topLevelCategory);
        ProductListingsPage.currentProductListTitle.waitForVisible();
        expect(ProductListingsPage.currentProductListTitle.getText()).to.eql(topLevelCategory)
    });

    Then(/^I am able to visit the secondary level category for "([^"]*)" called "([^"]*)"$/, function (topLevelCategory, secondaryLevel) {
        Homepage.selectSubLevelMenuItem(topLevelCategory, secondaryLevel);
    });

});
