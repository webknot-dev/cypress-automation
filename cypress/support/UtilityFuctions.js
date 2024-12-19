import Tesseract from 'tesseract.js';

class UtilityFunctions {


    // Navigate to a URL
    async get(url) {
        cy.visit(url);
    }


    //click on the element
    async click(selector) {
        cy.get(selector).click();
    }


    // Perform login action
    async login(emailSelector, emailValue, passwordSelector, passwordValue, captchaSelector, captchaImageSelector, loginButtonSelector) {
        // Enter email and password
        cy.get(emailSelector).click({ force: true }).type(emailValue);
        cy.get(passwordSelector).click({ force: true }).type(passwordValue);

        // Capture captcha image and process it with Tesseract.js
        cy.get(captchaImageSelector).screenshot('captcha');
        cy.wait(6000);

        cy.readFile('./cypress/screenshots/captcha.png', 'base64').then((base64Image) => {
            return Tesseract.recognize(
                `data:image/png;base64,${base64Image}`,
                'eng',
                { workerBlobURL: false }
            ).then(({ data: { text } }) => {
                const captchaText = text.trim();
                cy.log(`Captcha Solved: ${captchaText}`);
                // Enter the extracted captcha text
                cy.get(captchaSelector).type(captchaText);
            });
        });


        // Click the login button
        cy.get(loginButtonSelector).click();
    }

    //Element Present
    async waitForElementPresence(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('be.visible');
    }

    //Wait and click 
    async waitAndClick(selector, timeout = 10000) {
        cy.get(selector, { timeout }).click();
    }

    // Close popup if present
    async closePopupIfPresent(popupSelector, buttonSelector) {
        cy.get(popupSelector).then((popup) => {
            if (popup.is(':visible')) {
                cy.get(buttonSelector).click();
            }
        });
    }

    // Select list item
    async selectListItem(listSelector, targetValue) {
        cy.get(listSelector)
            .contains('li', targetValue)
            .click();
    }

    // Scroll element into view
    async scrollIntoView(selector) {
        cy.get(selector).scrollIntoView();
    }

    // Scroll within a container
    async scrollPageInContainer(containerSelector, init, final) {
        cy.get(containerSelector).scrollTo(init, final);
    }

    // Scroll the page
    async scrollPage(init, final) {
        cy.scrollTo(init, final);
    }

    // Upload a file
    async uploadingFile(inputSelector, filePath) {
        cy.get(inputSelector).attachFile(filePath);
    }

    // Select a date
    async selectingDate(selector, date) {
        cy.get(selector).type(date).type('{enter}');
    }

    // Input text into a field
    async inputField(selector, inputValue) {
        cy.get(selector).type(inputValue);
    }

    // Quit the browser (Cypress automatically handles this)
    async quit() {
        cy.log('Tests will ended here');
    }
}


export default UtilityFunctions; 