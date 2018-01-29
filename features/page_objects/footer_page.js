import Page from './page';

class FooterPage extends Page {

    get copyrightText()  { return browser.element('div.sf-footer__copyright'); }

    get emailFormContainer() { return browser.element('div.sf-footer__signup')}
    get emailInput() { return browser.element('div.sf-footer__signup  input.sf-footer__email-input');}
    get invalidSubmitEmailForNewsletter() { return browser.element('div.sf-footer__signup  input.sf-footer__sign-up-arrow'); }
    get submitEmailForNewsletter() { return browser.element('div.sf-footer__signup  input.sf-footer__sign-up-arrow--valid'); }

    signUpForNewsletter(email) {
        this.emailFormContainer.waitForVisible()
        this.invalidSubmitEmailForNewsletter.waitForVisible()
        this.emailInput.setValue(email)
        this.submitEmailForNewsletter.waitForVisible()
        this.submitEmailForNewsletter.click()
    }
}

export default new FooterPage();