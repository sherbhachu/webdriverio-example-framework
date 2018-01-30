import Page from './page';

class ProductListingsPage extends Page {

    get currentProductListTitle() { return $('div.product-list-title h1') }
    get currentNumberOfProducts() { return $('div.product-list-title span.total-number-of-products') }

    get currentSelectedView() { return $('div#product-list-menu.product-list-menu div.product-list-view-and-sort a.secondary-button.selected') }

    get sortProductsBy() { return $('form#product-list-price-filter select') }

    get sizeGuideLink() { return $('a#filters-size-guide') }

    get listOfDesignersInProductsListings() { return browser.elements('span.designer') }

    get subNavSection() { return $('ul#subnav.category-nav.nav-section.filter') }

    get designerFilterContainer() { return $('div.filters div#designer-filter div div.jspContainer') }

    get designerFilterScrollable() { return $('#designer-filter div.scroll-pane.jspScrollable') }

    get filtersSizes() { return $('a#filters-size-guide') }

    chooseClothingCategory(category) {
        this.subNavSection().elements('li').value.some(function(elem){
            if (elem.getText() === category) {
                return elem.click();
            }
        });
        expect(this.subNavSection().element('li.selected').getText()).to.include(category)
    }

    getListOfCurrentVisibleDesigners() {
        let arr = [];
        this.designerFilterContainer.elements('li a div.filter-name span').value.forEach(function(elem){
            arr.push(elem.getText())
        });
        return arr
    }

    moveToDesignerScrollView() {
        browser.moveToObject(this.designerFilterContainer.selector,0,-200)
    }

    moveToSizeOptions() {
        if (browser.isVisible(this.filtersSizes.selector) === true) {
            browser.moveToObject(this.filtersSizes.selector)
        }
    }

    scrollDesignerIntoView(designer) {
        let count = 0;
        let visiblieDesigners = this.getListOfCurrentVisibleDesigners();

        while ((count < 10) && !visiblieDesigners.includes(designer)) {
            browser.swipeUp(this.designerFilterScrollable.selector,200,500)
            browser.pause(1000)
            visiblieDesigners = this.getListOfCurrentVisibleDesigners();
        }
        browser.swipeUp(this.designerFilterScrollabl.selector,20,500)
    }

    clickOnDesignerInView(designer) {
        $(this.designerFilterContainer.selector).elements('li a div.filter-name').element("span*="+designer+"").click()
    }

    getNumberOfResuts() {
        parseFloat($('div.product-list-title span.total-number-of-products').getText().replace(/,/g, ''))
    }

    switchToOutfitView() {
        if (this.currentSelectedView.getText() === "Product view") {
            this.currentSelectedView.click()
        }
    }

    switchToProductView() {
        if (this.currentSelectedView.getText() === "Outfit View") {
            this.currentSelectedView.click()
        }
    }

    sortProducts(sortOption) {
        //Sort by, New in, Price Low to High, Price High to Low
        this.sortProductsBy.selectByVisibleText(sortOption)
    }

    chooseColour(colourOption) {
        browser.elements('div#colour-filter li a span').element(".filter-name="+colourOption+"").click();
        browser.pause(3000); //change to waitUntil later.
        expect(browser.elements('div#colour-filter li a span').element(".filter-name="+colourOption+"").element('../..').getAttribute('class')).to.equal("selected")
    }

    getCurrentlySelectedColours() {
        browser.elements('div#colour-filter li.selected').getText()
    }

    clearAllColours() {
        $('div#colour-filter a.clear_filter').click()
        let arr = []
        browser.elements('div#colour-filter ul li').value.forEach(function(elem) {
            arr.push(elem.getAttribute('class'))
        })
        expect(arr).not.to.include('selected')
    }

    chooseSize(sizeOption) {
        this.moveToDesignerScrollView()
        this.moveToSizeOptions()
        browser.elements('div#size-filter li a span').element(".size_value="+sizeOption+"").click()
        browser.pause(1000);
        expect(browser.elements('div#size-filter li a span').element(".size_value="+sizeOption+"").element('../..').getAttribute('class')).to.equal("selected")
    }

    clearAllSizes() {
        $('div#size-filter a.clear_filter').click()
        let arr = []
        browser.elements('div#size-filter ul li').value.forEach(function(elem) {
            arr.push(elem.getAttribute('class'))
        })
        expect(arr).not.to.include('selected')
    }

    checkSizeGuide() {
        this.sizeGuideLink().click()
        expect(browser.windowHandles().value.length).to.eql(2)
        browser.window(browser.windowHandles().value[1])
        expect(browser.getUrl()).to.include('sizechart')
    }

    getFirstProductsDetails() {
        let split = $('div#product-list ul.products li div.description').getText().split('\n')
        return {
            designer: split[0],
            description: split[1],
            price: split[2] //returned as string
        }
    }

    getPricesOfAllVisibleProducts() {
        let arr = []
        browser.elements('div#product-list ul.products li div.description span.price').value.forEach(function(elem) {
            arr.push(elem.getText())
        })
        let filteredArr = []
        arr.forEach(function(elem) {
            filteredArr.push(elem.slice(1).replace(/,/g, ''))
        })
        return filteredArr
    }

    getDetailsForRandomProduct() {
        let split = browser.elements('div#product-list ul.products li div.description').value[this.generateRandomNumber()].getText().split('\n')
        return {
            designer: split[0],
            description: split[1],
            price: split[2] //returned as string
        }
    }

    chooseProductWithDesigner(designer) {
        this.listOfDesignersInProductsListings.waitForVisible();
        browser.elements('div#product-list ul.products li div.description span.designer').value.some(function(elem) {
            if (elem.getText() === designer) {
                return elem.click();
            }
        });
    }

    chooseProductWithDescription(description) {
        browser.elements('div#product-list ul.products li div').element(".description*="+description+"").element('..').element('div.product-image').click()
    }

    getAllDesignerNamesListedInView() {
        let arr = [];
        this.listOfDesignersInProductsListings.waitForVisible();
        this.listOfDesignersInProductsListings.value.forEach(function(elem) {
            arr.push(elem.getText())
        });
        return arr
    }

    getCurrentNumberOfProducts() {
        browser.moveToObject(this.currentNumberOfProducts.selector);
        return parseInt(this.currentNumberOfProducts.getText().replace(/,/g, ''))
    }

    generateRandomNumber(range = 10) {
        return Math.floor(Math.random() * range) + 1
    }

}

export default new ProductListingsPage();
