import Page from './page';

class Homepage extends Page {

    get napLogo()  { return $('a.sf-logo') }

    get topLevelNavLinks() { return browser.elements('ul.sf-nav__bar.sf-nav__section li.sf-nav__level1'); }

    get localeHeader() { return $('div.sf-header__locale') }

    get registerLink() { return $('li.sf-account__register a') }
    get signInLink() { return $('li.sf-account__sign-in a') }
    get wishlistIcon() { return $('a.sf-wishlist__icon') }
    get shoppingBasket() { return $('a.sf-basket__icon') }

    get currentBasketCount() { return $('span#basket-item-count') }

    get clearSearchTerm() { return $('nav.sf-nav.sf-hover form button.sf-search__clear') }
    get currentSearchSuggestions() { return $('div.sf-search__popup.sf-search__popup--open div.sf-search__content div.sf-search__results') }

    get currentProductListTitle() { return $('div.product-list-title h1') }
    get currentNumberOfProducts() {return $('div.product-list-title span.total-number-of-products') }

    get currentSelectedView() { return $('div#product-list-menu.product-list-menu div.product-list-view-and-sort a.secondary-button.selected') }

    get sortProductsBy() { return $('form#product-list-price-filter select') }

    get sizeGuideLink() { return $('a#filters-size-guide') }

    get searchField() { return $('nav.sf-nav.sf-hover div.sf-search') }
    get searchFieldInput() { return $('nav.sf-nav.sf-hover div.sf-search__header form input') }

    get countryPopup() { return $('span.sf-country-popup__toggle') }
    get countryPopupContents() { return $('div.sf-popup__content ul') }

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
        this.countryPopup.click()
        this.countryPopupContents.waitForVisible()
        //$('div.sf-popup__content ul').elements('li label').value.forEach(function(elem){ console.log(elem.getValue())})
        this.countryPopupContents.elements('li').element("label*="+country+"").click()
        expect(this.countryPopup.getText()).to.equal(country)
    }

    getCurrentLocaleDetails() {
        this.localeHeader.getText()
    }

    searchForTerm(searchTerm) {
        this.searchField.click()
        this.searchFieldInput.isVisible()
        this.searchFieldInput.setValue(searchTerm)
        browser.pause(1000)
    }

    getSearchSuggestions() {
        this.currentSearchSuggestions.waitForVisible();
        let suggestions = [];
        this.currentSearchSuggestions.elements('li a').value.forEach(function(elem){
            suggestions.push(elem.getText())
        });
        return suggestions
    }

    chooseClothingCategory(category) {
        $('ul#subnav.category-nav.nav-section.filter').elements('li').value.some(function(elem){
            if (elem.getText() === category) {
                return elem.click();
            }
        });
        expect($('ul#subnav.category-nav.nav-section.filter').element('li.selected').getText()).to.include(category)
    }
}

export default new Homepage();