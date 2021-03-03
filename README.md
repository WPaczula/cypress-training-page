# Cypress training page

This repository contains the source code for the cypress training page together with tests.

## Setup

1. Make sure you have nodejs installed
2. Install your dependencies with `npm install`
3. Run the application with `npm run dev`
4. Run tests with `npx cypress open`

## Typescript

This branch is configured to use typescript. Thanks to typescript you can have a better conroll over used methods - no more misspelled functions
and intellisence for your own commands.

To migrate to typescript create a `tsconfig.json` in the `cypress` directory and install:

1. typescript
2. @types/cypress

## @testing-library/cypress

For react applications the most popular library for testing is @testing-library/react. There is a library for cypress which adds the same selectors as in the react one. It allows finding elements by label text, placeholders and test id attributes which may be added by developers anyway.
