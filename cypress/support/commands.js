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

// Cypress.Commands.add('loginWebsite', (email, password, spec) => {
//     cy.visit('https://eservices.tax.gov.ae/#/Logon');
//     cy.get('#__xmlview0--idSplitter-content-0').should('be.visible');
//     cy.get('#__text9').should('exist');`

//     cy.get('#__data48').click({ force: true });

//     cy.wait(2000).get('#__xmlview0--email-inner')
//         .should('exist')
//         .type(email, { force: true });

//     cy.get('#__xmlview0--PasswordInput-inner')
//         .should('exist')
//         .type(password, { force: true });

//     cy.get('#captcha-pad-logon').screenshot('captcha-screenshot');
//     cy.task('readCaptcha', `./cypress/screenshots/${spec}/captcha-screenshot.png`).then((captchaText) => {
//         console.log('Recognized Captcha Text:', captchaText);

//         cy.get('#__xmlview0--LOGIN_A_SEC_CODE_input-inner')
//             .type(captchaText, { force: true })
//     });
//     cy.get('#__xmlview0--loginBtn-inner').click({ force: true });
//     cy.get('#__xmlview5--emailId').should('have.text', email);
//     cy.contains('Create New Taxable Person Profile').should('exist');

// })

// Visit a URL
Cypress.Commands.add('visitUrl', (url) => {
    cy.visit(url);
});

// Click on an element
Cypress.Commands.add('clickElement', (selector) => {
    cy.get(selector).click();
});

// Perform login action
Cypress.Commands.add('login', (emailSelector, emailValue, passwordSelector, passwordValue, captchaSelector, captchaImageSelector, loginButtonSelector, specName) => {

    cy.get('#__xmlview0--idSplitter-content-0').should('be.visible');
    cy.get('#__text9').should('exist');

    cy.get('#__data48').click({ force: true });

    cy.get(emailSelector).click({ force: true }).type(emailValue);
    cy.get(passwordSelector).click({ force: true }).type(passwordValue);

    cy.get(captchaImageSelector).screenshot('captcha-screenshot');
    cy.task('readCaptcha', `./cypress/screenshots/${specName}/captcha-screenshot.png`).then((captchaText) => {
        console.log('Recognized Captcha Text:', captchaText);
        cy.get(captchaSelector).type(captchaText, { force: true });
    });

    cy.get(loginButtonSelector).click();
});

// Wait for element presence
Cypress.Commands.add('waitForElementPresence', (selector) => {
    cy.get(selector).should('be.visible');
});

// Wait and click
Cypress.Commands.add('waitAndClick', (selector, timeout = 10000) => { // Default timeout set to 10 seconds
    cy.get(selector, { timeout }).click();
});

// Close popup if present
/* Cypress.Commands.add('closePopupIfPresent', (popupSelector, buttonSelector) => {
    console.log("popupSelector",popupSelector)
    console.log("buttonSelector",buttonSelector)
    cy.xpath(popupSelector).then((popup) => {
        console.log("inside method--")
        if (popup.is(':visible')) {
            console.log("inside if---")
            cy.xpath(buttonSelector).click();
            console.log("clickeddd")
        }
    });
}); */
// Close popup if present
// Cypress.Commands.add('closePopupIfPresent', (popupSelector, buttonSelector) => {
//     cy.xpath(popupSelector) // Locate the popup using xpath
//         .should('exist') // Ensure the popup exists
//         .then(($popup) => {
//             if ($popup.is(':visible')) { // Check if the popup is visible
//                 cy.log("Popup detected. Attempting to close.");
//                 cy.xpath(buttonSelector).click(); // Close the popup
//                 cy.wait(2000); // Wait for 2 seconds (adjust if necessary)
//             } else {
//                 cy.log("Popup is not visible.");
//             }
//         })
//         .catch(() => {
//             cy.log("No popup detected.");
//         });
// });

Cypress.Commands.add('closePopupIfPresent', (popupSelector, buttonSelector) => {
    cy.get('body').then(($body) => { // Check if the body contains the popup
        try {
            if ($body.find(popupSelector).length > 0) {
                cy.get(popupSelector).should('be.visible'); // Assert the popup is visible
                cy.log("Popup detected. Attempting to close.");
                cy.get(buttonSelector).click(); // Close the popup
                cy.wait(2000); // Optional wait
            } else {
                cy.log("No popup detected.");
            }
        } catch (error) {
            cy.log("Error occurred while handling the popup: ", error.message);
        }
    });
});


// Select list item
Cypress.Commands.add('selectListItem', (dropdownLocator, itemText) => {
    cy.get(dropdownLocator).click(); // Open the dropdown
    cy.get('li') // Ensure 'li' is the correct tag for the dropdown items
        .contains(itemText) // Match the item text
        .should('be.visible') // Ensure it's visible
        .click(); // Click on the item
});


// To element in view
Cypress.Commands.add('scrollToView', (locatorValue) => {
    try {
        cy.get(locatorValue).scrollIntoView().should('be.visible');
    } catch (error) {
        cy.log('Error in scrollintoview command:', error);
    }
})

// Scroll within a container
Cypress.Commands.add('scrollPageInContainer', (containerSelector, init, final) => {
    cy.get(containerSelector).scrollTo(init, final);
});

// Scroll the page
Cypress.Commands.add('scrollPage', (init, final) => {
    cy.scrollTo(init, final);
});

// Upload a file
Cypress.Commands.add('uploadingFile', (inputSelector, filePath) => {
    cy.get(inputSelector).attachFile(filePath);
});

// Select a date
Cypress.Commands.add('selectingDate', (selector, date) => {
    cy.get(selector).type(date).type('{enter}');
});

// Input text into a field
Cypress.Commands.add('inputField', (selector, inputValue) => {
    cy.get(selector).type(inputValue);
});

// Quit the browser (Cypress automatically handles this)
Cypress.Commands.add('quit', () => {
    cy.log('Tests will end here');
});