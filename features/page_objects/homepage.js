import Page from './page';

class Homepage extends Page {

    get napLogo()  { return browser.element('a.sf-logo'); }

    get topLevelNavLinks() { return browser.elements('ul.sf-nav__bar.sf-nav__section li.sf-nav__level1'); }

    get registerLink() { return browser.element('li.sf-account__register a'); }
    get signInLink() { return browser.element('li.sf-account__sign-in a'); }
    get wishlistIcon() { return browser.element('a.sf-wishlist__icon'); }
    get shoppingBasket() { return browser.element('a.sf-basket__icon'); }

    get currentBasketCount() { return browser.element('span#basket-item-count');}

    get clearSearchTerm() { return browser.element('nav.sf-nav.sf-hover form button.sf-search__clear'); }
    get currentSearchSuggestions() { return browser.element('div.sf-search__popup.sf-search__popup--open div.sf-search__content div.sf-search__results'); }

    get currentProductListTitle() { return browser.element('div.product-list-title h1'); }
    get currentNumberOfProducts() {return browser.element('div.product-list-title span.total-number-of-products'); }

    get currentSelectedView() { return browser.element('div#product-list-menu.product-list-menu div.product-list-view-and-sort a.secondary-button.selected');}

    get sortProductsBy() { return browser.element('form#product-list-price-filter select');}

    get sizeGuideLink() {return browser.element('a#filters-size-guide')}

    open() {
        super.open('/');
    }

    selectTopLevelMenuItem(option) {
        this.topLevelNavLinks.value.some(function(elem){
            if (elem.getText() === option) {
                return elem.click();
            }
        });
    }

    selectSubLevelMenuItem(toplevel,sublevel) {
        browser.waitForVisible("*="+toplevel+"")
        browser.moveToObject("*="+toplevel+"")
        browser.waitForVisible("*="+sublevel+"")
        browser.click("*="+sublevel+"")
    }

    setCountryTo(country) {
        browser.element('span.sf-country-popup__toggle').click()
        browser.element('div.sf-popup__content ul').waitForVisible()
        //browser.element('div.sf-popup__content ul').elements('li label').value.forEach(function(elem){ console.log(elem.getValue())})
        browser.element('div.sf-popup__content ul').elements('li').element("label*="+country+"").click()
        expect(browser.element('span.sf-country-popup__toggle').getText()).to.equal(country)
    }

    getCurrentLocaleDetails() {
        browser.element('div.sf-header__locale').getText()
    }

    searchForTerm(searchTerm) {
        browser.element('nav.sf-nav.sf-hover div.sf-search').click()
        browser.element('nav.sf-nav.sf-hover div.sf-search__header form input').isVisible()
        browser.element('nav.sf-nav.sf-hover div.sf-search__header form input').setValue(searchTerm)
        browser.pause(1000)
    }

    getSearchSuggestions() {
        this.currentSearchSuggestions.waitForVisible();
        var suggestions = [];
        this.currentSearchSuggestions.elements('li a').value.forEach(function(elem){
            suggestions.push(elem.getText())
        });
        return suggestions
    }

    chooseClothingCategory(category) {
        browser.element('ul#subnav.category-nav.nav-section.filter').elements('li').value.some(function(elem){
            if (elem.getText() === category) {
                return elem.click();
            }
        });
        expect(browser.element('ul#subnav.category-nav.nav-section.filter').element('li.selected').getText()).to.include(category)
    }
}

export default new Homepage();