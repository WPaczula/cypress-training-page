# Cypress training page

This repository contains the source code for the cypress training page together with tests.

## Setup

1. Make sure you have nodejs installed
2. Install your dependencies with `npm install`
3. Run the application with `npm run dev`
4. Run tests with `npx cypress open`

## Typescript

This branch is configured to use typescript. Thanks to typescript you can have a better conroll over used methods - no more misspelled functions
and intellisence for your own commands. Steps to add typescript:

1. Install `typescript` and `@types/cypress` - `npm i typescript @types/cypress -D`
2. Create a `tsconfig.json` in the `cypress` directory (you can probably copy the one from this repo, if you don't want to use testing library delete it from "types" section)
3. Adjust each file extension to `.ts` from `.js`
4. Adjust the plugins file (see it in the repo)
5. Add your custom commands type declaration - see `support/commands.ts`
6. Use absolute paths for imports
7. Run your tests 

## @testing-library/cypress

For react applications the most popular library for testing is @testing-library/react. There is a library for cypress which adds the same selectors as in the react one. It allows finding elements by label text, placeholders and test id attributes which may be added by developers anyway. Steps to add cypress testing library: 

1. Install it via `npm i @testing-library/cypress -D`
2. Include it in the `support/index.ts` file: `import '@testing-library/cypress/add-commands'`
3. Add it in the `tsconfig.json` in the "types" section
4. Use extended selectors like `findByLabelText`, `findByPlaceholderText`,  `findByDisplayValue`, `findByTestId`
