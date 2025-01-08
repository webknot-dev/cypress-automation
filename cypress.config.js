const { defineConfig } = require("cypress");
const { createWorker } = require('tesseract.js');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const fs = require('fs');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async readCaptcha(filePath) {
          if (!fs.existsSync(filePath)) {
            const alternateFilePath = './cypress/screenshots/captcha-screenshot.png';
            const anotherAlternateFilePath = './cypress/screenshots/main.cy.js/captcha-screenshot.png';
            if (fs.existsSync(alternateFilePath)) {
              filePath = alternateFilePath;
            } else if (fs.existsSync(anotherAlternateFilePath)) {
              filePath = anotherAlternateFilePath;
            } else {
              throw new Error(`File not found in both directories: ${filePath} and ${alternateFilePath} also in ${anotherAlternateFilePath}`);
            }
          }
          const worker = await createWorker();
          const { data: { text } } = await worker.recognize(filePath);
          await worker.terminate();
          fs.unlinkSync(filePath)
          return text.trim();
        },
      }),
        on('task', { downloadFile })
    },
    chromeWebSecurity: false,
    waitForAnimations: true,
    watchForFileChanges: true,
    pageLoadTimeout: 200000,
    defaultCommandTimeout: 30000,
  },
});