const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      return config;
    },
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: 'cypress/results/test-results-[hash].xml'
    }
  },
  video: true
});
