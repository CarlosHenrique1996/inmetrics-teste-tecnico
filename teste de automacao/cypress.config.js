const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://advantageonlineshopping.com",
    setupNodeEvents(on, config) {
      const envBaseUrl = config.env.baseUrl
      config.baseUrl = envBaseUrl
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/step_definitions/*.feature"
  },
})