var wdioConf = require('./wdio.conf.js');

let x = {

    capabilities: [{
         browserName: 'phantomjs',
    //     platform: '',
    //     version: '',
    //     maxInstances: '5',
    //
    //     //  specs: [
    //     //    './test/specs/*.js'
    //     //  ],
     }],

    services: ['phantomjs'],

    phantomjsOpts: {
      webdriverLogfile: 'phantomjs.log',
      ignoreSslErrors: true
    },
};

exports.config = Object.assign(wdioConf.config, x);
