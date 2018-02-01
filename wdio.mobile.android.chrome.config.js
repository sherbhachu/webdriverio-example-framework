const wdioConf = require('./wdio.conf.js');

let x = {

    capabilities: [
        {
            platformName: 'Android',
            deviceName: 'Android Emulator',
            browserName: 'chrome',
            chromeOptions: {
                args: ['--no-managed-user-acknowledgment-check', '--no-user-gesture-required', '--oobe-force-show-screen ⊗']
            },
            noReset: false,
            dontStopAppOnReset: false,
            show_on_first_run_allowed : false,
            show_welcome_page: false,
            appActivity: '.MainActivity',
            appWaitActivity: 'SplashActivity',
            noSign: true,

        }],
        host: '0.0.0.0',
        port: '4723',
        services: ['appium'],

};

exports.config = Object.assign(wdioConf.config, x);