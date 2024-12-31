describe("Automating EX203A - Local Purchase Form", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX203A - LPF", () => {
        // Load data from the fixture file
        cy.fixture("example.json").then((data) => {
            // Visit the URL specified in the fixture data
            cy.visitUrl(data.EntryValues.url)
            cy.log("Navigated to FTA - Federal Tax Authority Successfully");
            // cy.downloadFile(data.EntryValues.file_url, 'cypress/downloads', '574e7711-ba7b-4899-a881-5b6cd97067ce.xlsx')

            // Perform login using the credentials and locators from the fixture data
            cy.login(data.LocatorsPath.emailInputField_id,
                data.AuthDetails.email,
                data.LocatorsPath.passwordInputField_id,
                data.AuthDetails.password,
                data.LocatorsPath.captchaInputField_id,
                data.LocatorsPath.captcha_element_id,
                data.LocatorsPath.loginButton_id,
                "ex203alpf.cy.js"
            )

            // Click on the taxable profile button
            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            // Close any popup if present
            cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)
            // Wait for the TRN validation element to be present
            cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_ex203alpf.EX203ALPF_container_id,
                data.locators_ex203alpf.EX203ALPF_title_id,
                data.locators_ex203alpf.EX203ALPF_description_id,
                data.locators_ex.EX_createNew_id,
                "EX203A",
                data.EntryValues.EX203ALPF_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // fill if the seller registrant and trn holder? if yes enter the TRN
            cy.optionBasedOnValue("no", "")
            //upload or drag drop Document Proof
            cy.clickElement("#DOPR-inner")
            cy.uploadingFile(data.locators_ex203alpf.EX203ALPF_upload_id, data.EntryValues.EX203ALPF_document_path)
            cy.clickElement("#onCancel-inner")
            //clicking on next button
            cy.clickXpathElement(data.locators_ex.EX_next_xpath)
            // upload the file
            cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX203ALPF_filePath)
        })
    });
})