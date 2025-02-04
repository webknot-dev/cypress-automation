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

// Close dialog if present
Cypress.Commands.add('closeDialogIfPresent', () => {
    cy.wait(10000).get('body').then(() => {
        cy.get('[role="dialog"]').if('visible').and('exist')
            .then(() =>
                cy.get('[role="dialog"]').last().within(() => {
                    cy.contains('OK').click({ force: true });
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
    cy.get(dropdownSelector).contains(value, { matchCase: false }).click({ force: true });
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

Cypress.Commands.add('optionBasedOnValue', (value, trn) => {
    if (value === "Yes" || value === "yes") {
        cy.get("#_BIID_A_SEL_REG_radiobutton1").click({ force: true });
        cy.get('#_BIID_A_SEL_TRN_input-inner').type(trn, { force: true });
        cy.get('#_BIID_VALIDATE_button-content').click({ force: true });
    } else if (value === "No" || value === "no") {
        cy.get("#_BIID_A_SEL_REG_radiobutton2").click({ force: true });
    }
});

Cypress.Commands.add('optionBasedValue', (value) => {
    cy.fixture('common.json').then((data) => {
        cy.fixture('ex203dsd.json').then((data1) => {
            if (value === "Yes" || value === "yes") {
                cy.get("#_EGCC_A_REG_GOODS_radiobutton1-label-text").click({ force: true });
                // download the excel template
                cy.clickElement(data.locators_ex.EX_download_id)
                // upload the file
                cy.uploadingFile(data.locators_ex.EX_upload_id, data1.EntryValues.EX203DSD_filePath)
            } else if (value === "No" || value === "no") {
                cy.get("#_EGCC_A_REG_GOODS_radiobutton2-label-text").click({ force: true });
            }
        });
    });
});

// Yes or no for IMPORT in EX202AIDZNCC
Cypress.Commands.add('optionsForImport', (ans, zoneNumber, Shipmentid) => {
    if (ans === "Yes" || ans === "yes") {
        cy.get('#_BIID_A_DTS_GOODS_radiobutton1-label-bdi').click({ force: true });
        cy.inputField('#_BIID_A_SHIPMENT_ID_combobox-arrow', Shipmentid);
        cy.inputField('#_BIID_A_DZ_NO_input-inner', zoneNumber);
    } else if (ans === "No" || ans == "NO") {
        cy.get('#_BIID_A_DTS_GOODS_radiobutton2-label-bdi').click({ force: true });
        cy.inputField('#_BIID_A_DZ_NO_input-inner', zoneNumber);
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
    cy.wait(5000)
});

// Select a date
Cypress.Commands.add('selectingDate', (selector, date) => {
    cy.get(selector).type(date, { force: true }).type('{enter}');
});

// Input text into a field
Cypress.Commands.add('inputField', (selector, inputValue) => {
    cy.get(selector).type(inputValue, { force: true }).type('{enter}');
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
        cy.log('Title:', exname);
        cy.log('Description:', exdescription);
        // cy.getByPartialId(extitleid.substring(0, 24), extitleid.substring(extitleid.length - 25)).should('have.text', exname);
        cy.contains(exname).should('exist').should('be.visible');
        // cy.getByPartialId(exdescriptionid.substring(0, 23), exdescriptionid.substring(exdescriptionid.length - 25)).should('have.text', exdescription);
        cy.contains(exdescription).should('exist').should('be.visible');
        cy.contains(excreatenewid).click({ force: true });
    });
});


//validations methods
// url validation
Cypress.Commands.add('validateUrl', (url) => {
    cy.url().should('eq', url);
});

// Email validation
Cypress.Commands.add('validateEmail', () => {
    cy.fixture('common.json').then((data) => {
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
    cy.contains(trn, { matchCase: false }).should('exist').should('be.visible');
    cy.contains(name, { matchCase: false }).should('exist').should('be.visible');
});




// Custom command for file upload for images


// Cypress.Commands.add('uploadFile', (addButtonSelector, fileNames, okButtonSelector1, okButtonSelector2) => {
    
//     fileNames.forEach((fileName) => {
      
//       cy.get(addButtonSelector).click();
//       cy.wait(3000); 
  
//       cy.get('input[type="file"]').attachFile(fileName);
//       cy.wait(3000); 
  
//       cy.xpath(okButtonSelector1).click();
//       cy.get(okButtonSelector2).click();
      
//       // Optionally, add a wait or verify that the upload was successful before proceeding
//       // For example:
//       // cy.get('.upload-status').should('contain', 'Upload successful');
//     });
//   });
Cypress.Commands.add('uploadFile', (addButtonSelector, fileNames, okButtonSelector1, okButtonSelector2) => {
    // Define allowed file extensions
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  
    // Check if file count exceeds the allowed limit
    if (fileNames.length > 10) {
      cy.log('Not allowed to upload more than 10 files');
      return; // Stop execution of the command if more than 10 files are provided.
    }
  
    // Iterate over each file name and perform the upload sequence
    fileNames.forEach((fileName) => {
      // Extract file extension and convert to lowercase
      const extension = fileName.split('.').pop().toLowerCase();
  
      // Check if the file extension is allowed
      if (!allowedExtensions.includes(extension)) {
        cy.log(`File format not allowed for file: ${fileName}`);
        return; // Skip uploading this file.
      }
  
      // Proceed with upload if the file is valid
      cy.get(addButtonSelector).click();
      cy.wait(3000); // Adjust timing as needed
  
      // Attach the file (one at a time)
      cy.get('input[type="file"]').attachFile(fileName);
      cy.wait(3000); // Adjust timing as needed
  
      // Click the "OK" buttons after each file upload
      cy.xpath(okButtonSelector1).click();
      cy.get(okButtonSelector2).click();
  
      // Optionally, add a wait or verify that the upload was successful before proceeding
      // For example:
      // cy.get('.upload-status').should('contain', 'Upload successful');
    });
  });
  
  

Cypress.Commands.add('clickElementWithXpath', (selector) => {
    cy.xpath(selector).click({ force: true });
});

//Validation of Designated zone number For EX202A - Release Goods from Designated Zone into Free Circulation (No Customs Check)
Cypress.Commands.add('validateDZDetails_ex202Argdz', () => {
    cy.fixture('common.json').then((data) => {
        cy.get('#__input31-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_value);
        cy.get('#__input32-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_arbic_value);
        cy.get('#__input33-inner').first().should('have.value', data.locators_ex.warehouse_regist_number);
        cy.get('#__input34-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_value);
        cy.get('#__input35-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_arbic_value);

    });
})

//Validation of Designated zone number For all forms
Cypress.Commands.add('validateDZDetails', () => {
    cy.fixture('common.json').then((data) => {
        cy.get('#_BIID_C_DZ_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_value);
        cy.get('#_BIID_C_DZ_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_arbic_value);
        cy.get('#_BIID_C_WHK_NO_input-inner').first().should('have.value', data.locators_ex.warehouse_regist_number);
        cy.get('#_BIID_C_WHK_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_value);
        cy.get('#_BIID_C_WHK_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_arbic_value);

    });
})

//Validation of Origin Designated zone number for EX202A - TGADZ
Cypress.Commands.add('validateOriginDZDetails', () => {
    cy.fixture('common.json').then((data) => {
        cy.get('#_BIID_C_ODZ_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_value);
        cy.get('#_BIID_C_ODZ_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dz_arbic_value);
        cy.get('#_BIID_C_OWHK_NO_input-inner').first().should('have.value', data.locators_ex.warehouse_regist_number);
        cy.get('#_BIID_C_OWHK_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_value);
        cy.get('#_BIID_C_OWHK_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameof_warehouse_keeper_arbic_value);

    });
})

//Validation of Destination Designated zone number for EX202A - TGADZ
Cypress.Commands.add('validateDestinationDZDetails', () => {
    cy.fixture('common.json').then((data) => {
        cy.get('#_BIID_C_DZ_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dest_dz_value);
        cy.get('#_BIID_C_DZ_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameOfthe_dest_dz_arbic_value);
        cy.get('#_BIID_C_WHK_NO_input-inner').first().should('have.value', data.locators_ex.warehouse_dest_regist_number);
        cy.get('#_BIID_C_WHK_NAME_EN_input-inner').first().should('have.value', data.locators_ex.nameof_dest_warehouse_keeper_value);
        cy.get('#_BIID_C_WHK_NAME_AR_input-inner').first().should('have.value', data.locators_ex.nameof_dest_warehouse_keeper_arbic_value);

    });
})
