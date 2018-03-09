const wdioConf = require('./wdio.conf.js');

let x = {

    capabilities: [
        {
            platform: "Mac",
            platformName: "iOS",
            platformVersion: process.env.PLATFORM_VERSION, //"11.2", etc
            deviceName: process.env.DEVICE_NAME, //"iPhone 8", "iPhone 6", etc
            automationName: "XCUITest",
            browserName: "Safari",
            waitforTimeout: 30000,
            commandTimeout: 30000,
            //newCommandTimeout: 3000,
        }],
        host: '0.0.0.0',
        port: '4723',
        services: ['appium'],

};

exports.config = Object.assign(wdioConf.config, x);