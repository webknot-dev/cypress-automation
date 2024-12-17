import Tesseract from 'tesseract.js';

describe('Captcha Handling with OCR', () => {
  it('should solve a numeric captcha using OCR', () => {
    // Visit the local captcha page
  //  cy.visit('./captcha_test.html');
    //cy.visit('http://localhost:3000/');
 // Update with your local server URL
    
    // Capture the captcha image or text
    cy.get('#captcha').then(($captcha) => {
      const captchaText = $captcha.text(); // Get the captcha text directly
      cy.log('Captcha Text: ', captchaText);

      // Use Tesseract.js if the captcha is an image (optional)
      // Tesseract.recognize(captchaImageUrl, 'eng').then(({ data: { text } }) => {
      //   const captchaValue = text.trim().match(/\d+/)[0]; // Extract digits
      // });

      // Enter the extracted captcha value into the input field
      cy.get('#captchaInput').type(captchaText);

      // Submit the form
      cy.get('#captchaForm button[type="submit"]').click();

      // Check for success message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.include('Captcha solved correctly!');
      });
    });
  });
});
