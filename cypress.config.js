///<reference types="Cypress"/>
const {mocha} = require("mochawesome")
const {addContext} = require("mochawesome/addContext")
const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');


module.exports = defineConfig({
  projectId: 'ad6swa',
  e2e: {
    baseUrl: 'https://www.betus.com.pa/',
    reporter: 'cypress-mochawesome-reporter',
    screenshotsFolder: 'cypress/screenshots',
    screenshotOnRunFailure: true,
    video:true,
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportTitle: "Automation Tests",
      reportFilename: "report-",
      charts:true,
      embeddedScreenshots:true,
      timestamp:true,
      code:false,
      inlineAssets: true,
      videoOnFailOnly: true,
      quiet: true
    },
    viewportHeight: 812,
    viewportWidth: 375,
    defaultCommandTimeout: 4000,
    userAgent: 'AT DBLX',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });


      on('before:browser:launch', (browser={}, launchOptions)=>{
        
        if(browser.name === 'chrome'){

          launchOptions.args.push('--user-agent=AT DBLX');
          launchOptions.args.push('--incognito');
          
        }
        console.log('before:browser:launch browser', browser) ;
        console.log('before:browser:launch launcOptions', launchOptions);
      });

      
    },

  }
});
