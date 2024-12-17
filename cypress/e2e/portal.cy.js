
import Tesseract from 'tesseract.js';
describe('Captcha Handling Test', () => {
    it('should solve the captcha and log in', () => {
      // Visit the login page
      cy.visit('https://eservices.tax.gov.ae/#/Logon');
        cy.wait(25000)
        cy.wait(5000)
        cy.get('#__xmlview0--email-inner').click({ force: true }).type('gaurav.chugani@ae.andersen.com')
        cy.get('#__xmlview0--PasswordInput-inner').click({ force: true }).type('Praveen@2022')
        
      cy.get('#captcha-pad-logon') .screenshot('captcha'); // Cypress saves screenshots in the cypress/screenshots folder
        cy.wait(6000)
      // Use Tesseract.js to extract text from the image
      cy.readFile('./cypress/screenshots/captcha.png', 'base64').then((base64Image) => {
        return Tesseract.recognize(
          `data:image/png;base64,${base64Image}`, // Image data
          'eng', // Language
          {
            workerBlobURL: false, // Disable Web Worker
          }
          
        ).then(({ data: { text } }) => {
          const captchaText = text.trim();
            console.log(captchaText);
            cy.log(captchaText)
          // Enter the extracted text into the captcha input field
          cy.get('[placeholder="Enter security code"]').type(captchaText,{ force: true });
        })
        })
        cy.get('#__xmlview0--loginBtn-inner').click({ force: true })
    });
});
