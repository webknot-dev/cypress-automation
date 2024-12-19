// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-xpath');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

Cypress.Commands.add('loginWebsite', (email, password, spec) => {
    cy.visit('https://eservices.tax.gov.ae/#/Logon');
    cy.get('#__xmlview0--idSplitter-content-0').should('be.visible');
    cy.get('#__text9').should('exist');
    cy.get('#__data48').click({ force: true });

    cy.wait(2000).get('#__xmlview0--email-inner')
        .should('exist')
        .type(email, { force: true });

    cy.get('#__xmlview0--PasswordInput-inner')
        .should('exist')
        .type(password, { force: true });

    cy.get('#captcha-pad-logon').screenshot('captcha-screenshot');
    cy.task('readCaptcha', `./cypress/screenshots/${spec}/captcha-screenshot.png`).then((captchaText) => {
        console.log('Recognized Captcha Text:', captchaText);

        cy.get('#__xmlview0--LOGIN_A_SEC_CODE_input-inner')
            .type(captchaText, { force: true })
    });
    cy.get('#__xmlview0--loginBtn-inner').click({ force: true });
    cy.get('#__xmlview5--emailId').should('have.text', email);
    cy.contains('Create New Taxable Person Profile').should('exist');

})


Cypress.Commands.add('scrollInView', (locatorValue) => {
    try {
        cy.get(locatorValue).scrollIntoView().should('be.visible');
    } catch (error) {
        cy.log('Error in scrollintoview command:', error);
    }
})
