
const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const mysql = require('mysql')

module.exports = defineConfig({
  projectId: '8ku768',
  name: 'QA',
  viewportWidth: 1500,
  viewportHeight: 800,
  video: false,
  defaultCommandTimeout: 8000,
  execTimeout: 60000,
  requestTimeout: 5000,
  responseTimeout: 80000,
  pageLoadTimeout: 8000,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  experimentalSessionAndOrigin: true,
  // pageLoadTimeout: 180000,
  experimentalModifyObstructiveThirdPartyCode: true,
  //chromeWebSecurity: false,
  //experimentalInteractiveRunEvents: true,
  //experimentalModifyObstructiveThirdPartyCode: true,


  env: {
    db1: {
      server: 'DB_CredOps_UAT.mercuria.met',
      database: 'Cassandra_UAT',
      authentication: {
        type: 'default',
        options: {
          userName: 'creditops_rw_lab',
          password: 'hfrse()289kwvjkwklamq',
        },
      },
      options: {
        database: 'Cassandra_UAT',
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: true,
        validateBulkLoadParameters: true,
      },
    },
  },

  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reportDir: "cypress/reports/html",
    "reporterOptions": {
      "charts": true,
      "overwrite": false,
      "html": true,
      "json": true,
      "reportTitle": "Cassandra UI Automation Test Report",
      "quiet": false,
      "screenshotOnRunFailure": true,
      "timestamp": true,
      "code": true,
      "inlineAssets": true, //Adds the asserts inline
      "includeScreenshots": true,
      "screenshotOnRunFailure": true
    },

    setupNodeEvents(on, config) {
      require('cypress-cucumber-preprocessor')
      on('file:preprocessor', cucumber());
      require('cypress-mochawesome-reporter/plugin')(on);
      require('./cypress/plugins/index.js')(on, config)
      return config
    },

    baseUrl: 'https://credit-data-service.uat.mercuria.systems/dashboard',
    //baseUrl: 'https://credit-data-reporting.uat.mercuria.systems/dashboard',
    specPattern: 'cypress/e2e/features/**/*.feature',
    userName: '',
    passWord: '',
    parseSpecialCharSequences: false,
    experimentalModifyObstructiveThirdPartyCode: false,


  },



})
