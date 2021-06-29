# Cypress training page

This repository contains the source code for the cypress training page together with tests.

## Setup

1. Make sure you have nodejs installed
2. Install your dependencies with `npm install`
3. Run the application with `npm run dev`
4. Run tests with `npx cypress open`

## BDD

This branch has a BDD test for login scenario using cucumber plugin. Steps to introduce BDD into your project:
1. Install `cypress-cucumber-processor` by `npm i cypress-cucumber-processor -D` command
2. Adjust the `cypress.json` file - add `"testFiles": "**/*.feature"` property
3. Add the cucumber plugin to the `plugins/index.js` file (check the content of this file in the repo)
4. Create `common` directory in the `integration` folder and add shared steps (`given.steps.js`, `when.steps.js` and `then.steps.js`)
5. Add a feature file with gherkin to the integration with a corresponding steps declaration folder. For example `login.feature` and `login/when.steps.js`.
6. Run your tests
