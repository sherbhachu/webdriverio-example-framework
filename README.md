# webdriverio-example-framework
WebdriverIO framework that uses ES6 (with Babel), Cucumber, Chai, Page Object model, Appium and more.

Note that this is a real world example and uses the Net A Porter website (http://www.net-a-porter.com)
### Updates over the next few days (early Feb 2018...)

1. Tidy up (a little more) the page objects so that browser elements are moved out of functions
2. Update wdio.conf.js, again, its a bit messy, but less than before
3. Add BrowserStack capability

## Assumptions...

 1. You are not 100% new to JavaScript or Cucumber
 2. You have the necessary JavaScript tools in place and installed (i.e. node)

## What this is / What's included....

 1. A fairly well put together WebDriverIO framwork for testing web apps, using JavaScript (ES6)
 2. Follows, generally, good JavaScript and general automation practices.
 3. An idea of how a framework can be setup to handle a real world app.
 4. Some example of basic reporting use of config files.
 5. A good way to see how elements can be located, though CSS selectors are of course the preferred choice.
 6. A good example to see Chai expectations in action.
 7. Good use of the Page Object Model.
 8. Demonstrable use of some ES6 capabilities.
 9. Supports Safari, on an iOS simulator (local, using Appium)

## What this is not...

1. An all-in-one super duper framework.
2. Something that you can 100% copy over for any app (though I suspect you'd be able to use most, as is).

## Known limitations...

 - Will not handle weird browser 'issues', (Currently only tested with Chrome)

## Want more?

Drop me an email, sherbhachu@googlemail.com for any comments, suggestions, etc.

## Instructions/Config required prior to use...

1. cd into webdriverio-example-framework/
2. npm install (it would be useful for me to know if you suffer any obscure/weird dependency issues...if unsure, always google first!)
3. npm run-script selenium-start

## Example commands to run a specific feature file...

After cd'ing into the 'webdriverio-example-framework' directory...

Run a specific feature, with DEBUG enabled...

The DEBUG flag allows you to use the 'driver.debug();' command without having to constantly
change the timeouts.
```
DEBUG=true wdio --spec features/search.feature
```

Run a suite of tests, in this instance, the 'basic' suite...
```
wdio --suite basic
```

Run a feature file for Safari on an iOS simulator...
```
wdio wdio.mobile.safari.config.js --spec features/safari.feature 
```

Run tests with a specific cucumber tag...
```wdio --cucumberOpts.tagExpression='@justme'```

Run the parameterised mobile configuration (see package.json), which runs a specific suite (mobile, located in the wdio.conf.js file)
```
DEVICE_NAME="iPhone 6" PLATFORM_VERSION="11.2" npm run parameterisedappium
```

Note that there are a few limitations to this, in the fact that WDIO does not currently allow you start multiple instances of Appium,
i.e. in does not seem to allow you to start Appium instance 'A' on port 1234 and Appium instance 'B' on port 4567.
This has to be managed separately, at least from what I can tell.