export default class Page {
    open(path) {
        browser.url(path);
    }

    saySomething(name) {
        console.log("Hello "+name+" from the base page!");
    }

}