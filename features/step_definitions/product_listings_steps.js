import ProductListingsPage from "../page_objects/product_listings_page";
import { defineSupportCode } from 'cucumber';
var InitialNumOfProducts = '';

defineSupportCode(function ({And, But, Given, Then, When}) {

    Given(/^I select the designer "([^"]*)"$/, function (designerName) {
        ProductListingsPage.moveToDesignerScrollView();
        ProductListingsPage.clickOnDesignerInView(designerName)
    });

    Then(/^The products listed should all have "([^"]*)" as the Designer$/, function (brandToCheck) {
        let designers = _.uniq(ProductListingsPage.getAllDesignerNamesListedInView());
        expect(designers).to.eql([brandToCheck])
    });

    Given(/^I capture the current number of results$/, function () {
        ProductListingsPage.currentNumberOfProducts.waitForVisible();
        InitialNumOfProducts = ProductListingsPage.getCurrentNumberOfProducts();
    });

    When(/^I select the colour "([^"]*)"$/, function (colourChosen) {
        ProductListingsPage.chooseColour(colourChosen)
    });

    When(/^I select the size "([^"]*)"$/, function (sizeChosen) {
        ProductListingsPage.chooseSize(sizeChosen)
    });

    Then(/^I should see fewer results returned$/, function () {
        browser.waitUntil(function () {
            return ProductListingsPage.getCurrentNumberOfProducts() < InitialNumOfProducts
        }, 5000, 'expected to see fewer results after 5s');
    });

    When(/^I choose to purchase a product from the designer "([^"]*)"$/, function (designer) {
        ProductListingsPage.chooseProductWithDesigner(designer);
    });

    Then(/^I should see product recommendations within HOW TO WEAR IT$/, function () {
        //Try and complete the following.
        expect(ProductListingsPage.howToWearItProductRecommendations.count).to.be > 1;
    });

});
