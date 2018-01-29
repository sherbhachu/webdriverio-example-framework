import Page from './page';

class ProductListingsPage extends Page {

    get currentProductListTitle() { return browser.element('div.product-list-title h1'); }
    get currentNumberOfProducts() {return browser.element('div.product-list-title span.total-number-of-products'); }

    get currentSelectedView() { return browser.element('div#product-list-menu.product-list-menu div.product-list-view-and-sort a.secondary-button.selected'); }

    get sortProductsBy() { return browser.element('form#product-list-price-filter select'); }

    get sizeGuideLink() {return browser.element('a#filters-size-guide'); }

    get listOfDesignersInProductsListings() {return browser.elements('span.designer'); }

    chooseClothingCategory(category) {
        browser.element('ul#subnav.category-nav.nav-section.filter').elements('li').value.some(function(elem){
            if (elem.getText() === category) {
                return elem.click();
            }
        });
        expect(browser.element('ul#subnav.category-nav.nav-section.filter').element('li.selected').getText()).to.include(category)
    }

    getListOfCurrentVisibleDesigners() {
        var arr = [];
        browser.element('div.filters div#designer-filter div div.jspContainer').elements('li a div.filter-name span').value.forEach(function(elem){
            arr.push(elem.getText())
        });
        return arr
    }

    moveToDesignerScrollView() {
        browser.moveToObject('div.filters div#designer-filter div div.jspContainer',0,-200)
    }

    moveToSizeOptions() {
        browser.moveToObject('a#filters-size-guide')
    }

    scrollDesignerIntoView(designer) {
        var count = 0;
        var visiblieDesigners = this.getListOfCurrentVisibleDesigners();

        while ((count < 10) && !visiblieDesigners.includes(designer)) {
            browser.swipeUp('#designer-filter div.scroll-pane.jspScrollable',200,500)
            browser.pause(1000)
            visiblieDesigners = this.getListOfCurrentVisibleDesigners();
        }
        browser.swipeUp('#designer-filter div.scroll-pane.jspScrollable',20,500)
    }

    clickOnDesignerInView(designer) {
        browser.element('div.filters div#designer-filter div div.jspContainer').elements('li a div.filter-name').element("span*="+designer+"").click()
    }

    getNumberOfResuts() {
        parseFloat(browser.element('div.product-list-title span.total-number-of-products').getText().replace(/,/g, ''))
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
        browser.pause(1000);
        expect(browser.elements('div#colour-filter li a span').element(".filter-name="+colourOption+"").element('../..').getAttribute('class')).to.equal("selected")
    }

    getCurrentlySelectedColours() {
        browser.elements('div#colour-filter li.selected').getText()
    }

    clearAllColours() {
        browser.element('div#colour-filter a.clear_filter').click()
        var arr = []
        browser.elements('div#colour-filter ul li').value.forEach(function(elem) {
            arr.push(elem.getAttribute('class'))
        })
        expect(arr).not.to.include('selected')
    }

    chooseSize(sizeOption) {
        this.moveToSizeOptions()
        browser.elements('div#size-filter li a span').element(".size_value="+sizeOption+"").click()
        browser.pause(1000);
        expect(browser.elements('div#size-filter li a span').element(".size_value="+sizeOption+"").element('../..').getAttribute('class')).to.equal("selected")
    }

    clearAllSizes() {
        browser.element('div#size-filter a.clear_filter').click()
        var arr = []
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
        let split = browser.element('div#product-list ul.products li div.description').getText().split('\n')
        return {
            designer: split[0],
            description: split[1],
            price: split[2] //returned as string
        }
    }

    getPricesOfAllVisibleProducts() {
        var arr = []
        browser.elements('div#product-list ul.products li div.description span.price').value.forEach(function(elem) {
            arr.push(elem.getText())
        })
        var filteredArr = []
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
        var arr = [];
        this.listOfDesignersInProductsListings.waitForVisible();
        this.listOfDesignersInProductsListings.value.forEach(function(elem) {
            arr.push(elem.getText())
        });
        return arr
    }

    getCurrentNumberOfProducts() {
        return parseInt(this.currentNumberOfProducts.getText().slice(1).replace(/,/g, ''))
    }

    generateRandomNumber(range = 10) {
        return Math.floor(Math.random() * range) + 1
    }


}

export default new ProductListingsPage();
