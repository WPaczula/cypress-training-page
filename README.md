# Cypress training page

This repository contains the source code for the cypress training page together with tests.

## Setup

1. Make sure you have nodejs installed
2. Install your dependencies with `npm install`
3. Run the application with `npm run dev`
4. Run tests with `npx cypress open`

## BDD

This branch has a BDD test for login scenario using cucumber plugin. The feature file has to be put into `integration` directory and the steps should be in the folder with the same name. In this case it's `login.feature` and `login/when.steps.js`. Common steps can be placed in `common/*.js` files.
