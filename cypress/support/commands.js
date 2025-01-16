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
require('cypress-if');
require('cypress-downloadfile/lib/downloadFileCommand')
import 'cypress-file-upload';


// cy.downloadFile('link to file', 'path', 'file name with extension')


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
Cypress.Commands.add('clickXpathElement', (selector) => {
    cy.xpath(selector).click({ force: true });
});

Cypress.Commands.add('clickElement', (selector) => {
    cy.get(selector).click({ force: true });
});

// Perform login action
Cypress.Commands.add('login', (emailSelector, emailValue, passwordSelector, passwordValue, captchaSelector, captchaImageSelector, loginButtonSelector, specName) => {

    cy.get('#__xmlview0--idSplitter-content-0').should('be.visible');
    cy.get('#__text9').should('exist');

    cy.wait(5000).get('#__data48').click({ force: true });

    cy.get(emailSelector).click({ force: true }).type(emailValue, { force: true });
    cy.get(passwordSelector).click({ force: true }).type(passwordValue, { force: true });

    cy.get(captchaImageSelector).screenshot('captcha-screenshot');
    cy.task('readCaptcha', `./cypress/screenshots/${specName}/captcha-screenshot.png`).then((captchaText) => {
        console.log('Recognized Captcha Text:', captchaText);
        cy.get(captchaSelector).type(captchaText, { force: true });
    });

    cy.get(loginButtonSelector).click({ force: true });
});

// Wait for element presence
Cypress.Commands.add('waitForXpathElementPresence', (selector) => {
    cy.xpath(selector).should('be.visible');
});

Cypress.Commands.add('waitForElementPresence', (selector) => {
    cy.xpath(selector).should('be.visible');
});

// Wait and click
Cypress.Commands.add('waitAndClick', (selector) => {
    cy.get(selector, { timeout }).click();
});

// Close popup if present
Cypress.Commands.add('closePopupIfPresent', (popupSelector, buttonSelector) => {
    cy.wait(10000).get('body').then(() => {
        cy.get(popupSelector).if('visible').and('exist')
            .then(() =>
                cy.get(popupSelector).within(() => {
                    cy.clickElement(buttonSelector)
                }))
            .else()
            .log('No popup found');
    })
});


// Select list item
Cypress.Commands.add('selectListItem', (listSelector, targetValue) => {
    cy.get(listSelector).contains('li', targetValue).click();
});

//select from drop down
Cypress.Commands.add('selectFromDropdown', (dropdownSelector, value) => {
    cy.get(dropdownSelector).contains(value).click({ force: true });
});

// To element in view
Cypress.Commands.add('scrollToView', (locatorValue) => {
    try {
        cy.get(locatorValue).scrollIntoView().should('be.visible');
    } catch (error) {
        cy.log('Error in scrollintoview command:', error);
    }
})

Cypress.Commands.add('scrollToViewXpath', (locatorValue) => {
    try {
        cy.xpath(locatorValue).scrollIntoView().should('be.visible');
    } catch (error) {
        cy.log('Error in scrollintoview command:', error);
    }
})

Cypress.Commands.add('selectOptionBasedOnValue', (value, shipmentid) => {
    if (value === "Yes" || value === "yes") {
        cy.get("#_BIID_A_DTS_GOODS_radiobutton1").click({ force: true });
        cy.get('#_BIID_A_SHIPMENT_ID_combobox-arrow').type(shipmentid, { force: true });
    } else if (value === "No" || value === "no") {
        cy.get("#_BIID_A_DTS_GOODS_radiobutton2").click({ force: true });
    }
});

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
    cy.wait(5000).get(inputSelector).selectFile(filePath, { force: true });
});

// Select a date
Cypress.Commands.add('selectingDate', (selector, date) => {
    cy.get(selector).type(date, { force: true }).type('{enter}');
});

// Input text into a field
Cypress.Commands.add('inputField', (selector, inputValue) => {
    cy.get(selector).type(inputValue, { force: true });
});

// Quit the browser (Cypress automatically handles this)
Cypress.Commands.add('quit', () => {
    cy.log('Tests will end here');
});

Cypress.Commands.add('getByPartialId', (start, end) => {
    return cy.xpath(`//*[starts-with(@id, '${start}') and substring(@id, string-length(@id) - string-length('${end}') + 1) = '${end}']`);
});

// Select excise and validate the details then click on create new
Cypress.Commands.add('selectExcise', (excontainerid, extitleid, exdescriptionid, excreatenewid, exname, exdescription) => {
    cy.getByPartialId(excontainerid.substring(0, 21), excontainerid.substring(excontainerid.length - 25)).scrollIntoView()
    cy.getByPartialId(excontainerid.substring(0, 21), excontainerid.substring(excontainerid.length - 25)).should('be.visible').within(() => {
        cy.getByPartialId(extitleid.substring(0, 24), extitleid.substring(extitleid.length - 25)).should('have.text', exname);
        cy.getByPartialId(exdescriptionid.substring(0, 23), exdescriptionid.substring(exdescriptionid.length - 25)).should('have.text', exdescription);
        cy.contains(excreatenewid).click({ force: true });
    });
});



// Custom command for file upload for images
Cypress.Commands.add('uploadFile', (addButtonSelector, fileName, okButtonSelector1, okButtonSelector2) => {
  // Click the "Add" button
  cy.get(addButtonSelector).click();

  // Simulate file upload
  cy.get('input[type="file"]').attachFile(fileName);

  cy.wait(3000);
  // Click the "Upload" button
//   cy.get(uploadButtonSelector).click();

  // Handle the final "OK" buttons
  cy.get(okButtonSelector1).click(); 
  cy.get(okButtonSelector2).click(); 

  // Optional: Validate the upload (you can remove this if not needed)
//   cy.get('.upload-status').should('contain', 'Upload successful');
});

//Validations
// url validation
Cypress.Commands.add('validateUrl', (url) => {
    cy.url().should('eq', url);
});

// Email validation
Cypress.Commands.add('validateEmail', () => {
    cy.fixture('example.json').then((data) => {
        cy.get('[id$=emailId]').first().should('have.text', data.AuthDetails.email);
    });
})

//status and trn validation
Cypress.Commands.add('validateStatusAndTRN', (status, trn) => {
    cy.xpath("(//td[@data-sap-ui-column='__column123'])[4]").should('have.text', status);
    cy.xpath("(//td[@data-sap-ui-column='__column124'])[4]").should('have.text', trn);
});

//validate trn
Cypress.Commands.add('validateTRNandName', (trn, name) => {
    cy.contains(trn).should('exist').should('be.visible');
    cy.contains(name).should('exist').should('be.visible');
});

