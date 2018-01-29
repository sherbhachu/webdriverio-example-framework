import Homepage from "../page_objects/homepage";
import Footerpage from "../page_objects/footer_page.js";
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({And, But, Given, Then, When}) {
    Given(/^I am on the NAP Homepage$/, function () {
        Homepage.open();
        expect(Homepage.napLogo.isVisibleWithinViewport()).to.be.true;
    });

    Then(/^I can sign up to the newsletter using a random email$/, function () {
        Footerpage.signUpForNewsletter(test_data.get('valid_email_address'));
    });

    Given(/^I visit the Net\-a\-porter website$/, function () {
        Homepage.open();
        browser.pause(5000)
    });

});
