# Cypress Automation

## Installation

To get started with Cypress, you need to have Node.js and npm installed. Follow the steps below to install Cypress and other necessary plugins.

### Step 1: Install npm

If you haven't installed npm yet, you can download and install it from [Node.js official website](https://nodejs.org/).

### Step 2: Initialize npm

Navigate to your project directory and initialize npm:

```bash
npm init -y
```

### Step 3: Install Cypress

Install Cypress using npm:

```bash
npm install cypress --save-dev
```

### Step 4: Install Other Plugins

You may need additional plugins depending on your project requirements. Here are some common plugins:

- **cypress-file-upload**: For file upload testing
- **cypress-if**: For conditional testing
- **cypress-xpath**: For XPath support

Install these plugins using npm:

```bash
npm install cypress-if --save-dev
npm install cypress-xpath --save-dev
```

## Running Tests

### Open Mode

To run Cypress in open mode, use the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner, where you can select and run your tests interactively.

### Run Mode

To run Cypress tests in headed mode, use the following command:

```bash
npx cypress run --headed --browser chrome
```

To run Cypress tests in headed mode without runner ui, use the following command:

```bash
npx cypress run --no-runner-ui --headed --browser chrome
```

#### Run Specific Spec

To run a specific spec file, use the `--spec` option followed by the path to the spec file:

```bash
npx cypress run --no-runner-ui --headed --browser chrome --spec "cypress/e2e/your_spec_file.js"
```

Replace `your_spec_file.js` with the name of your spec file.

## Conclusion

You have now set up Cypress and learned how to run tests in both open and run modes. For more detailed information, refer to the [Cypress documentation](https://docs.cypress.io/).

## Dependencies

Here are the dependencies and plugins used in this project:

```json
"devDependencies": {
    "cypress": "^13.17.0",
    "cypress-if": "^1.13.2",
    "cypress-xpath": "^2.0.1"
},
"dependencies": {
    "tesseract.js": "^5.1.1"
}
```
