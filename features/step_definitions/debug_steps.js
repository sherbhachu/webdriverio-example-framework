import Homepage from "../page_objects/homepage";
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({And, But, Given, Then, When}) {
    Given(/^I choose to debug the website$/, function () {
        Homepage.saySomething("Im going into debug...");
        browser.debug();
    });
});