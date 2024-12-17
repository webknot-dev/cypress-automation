describe('Captcha Handling Test', () => {
    it('should solve the captcha and log in', () => {
      // Visit the login page
     // cy.visit('http://localhost:3000'); // Adjust URL if hosted elsewhere

       // Fill in username and password
       cy.get(':nth-child(1) > input').type('testuser'); // Adjust selector if needed
       cy.get('form > :nth-child(2) > input').type('password123');
  
      // Get the captcha text
      cy.get('#captcha-display').then(($captcha) => {
        const captchaText = $captcha.text().trim(); // Extract the captcha value
        cy.wait(5000)
        // Enter the captcha into the input field
        //cy.get('#captcha-input').type(captchaText);
        cy.get(':nth-child(3) > input').type(captchaText);
        cy.wait(5000)
  
       
  
        // Click the login button
        cy.get('button[type="submit"]').click();
  
        // Assert success message
        cy.contains('Login successful!').should('be.visible');
      });
    });
  
    it('should refresh the captcha and log in with the new code', () => {
      // Visit the login page
      cy.visit('http://localhost:3000');
      
        // Fill in username and password
        cy.get(':nth-child(1) > input').type('testuser');
        cy.get('form > :nth-child(2) > input').type('password123');

        cy.wait(5000)

      // Refresh the captcha
      cy.get(':nth-child(3) > div > button').click();
  
        cy.wait(5000)
      // Get the updated captcha text
      cy.get('#captcha-display').then(($captcha) => {
        const newCaptchaText = $captcha.text().trim();
  
        // Enter the new captcha into the input field
        cy.get(':nth-child(3) > input').type(newCaptchaText);
  
        
  
        // Click the login button
        cy.get('button[type="submit"]').click();
  
        // Assert success message
        cy.contains('Login successful!').should('be.visible');
      });
    });
  });
  