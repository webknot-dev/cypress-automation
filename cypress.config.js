const { defineConfig } = require("cypress");
const { createWorker } = require('tesseract.js');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async readCaptcha(filePath) {
          if (!fs.existsSync(filePath)) {
            const alternateFilePath = './cypress/screenshots/captcha-screenshot.png';
            if (fs.existsSync(alternateFilePath)) {
              filePath = alternateFilePath;
            } else {
              throw new Error(`File not found in both directories: ${filePath} and ${alternateFilePath}`);
            }
          }
          const worker = await createWorker();
          const { data: { text } } = await worker.recognize(filePath);
          await worker.terminate();
          fs.unlinkSync(filePath)
          return text.trim();
        },
      });
    },
    chromeWebSecurity: false,
    waitForAnimations: true,
    watchForFileChanges: true,
    pageLoadTimeout: 200000,
    defaultCommandTimeout: 30000,
  },
});