describe("Automating EX202A Production Within a Designated Zone", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202A - PWDZ", () => {
        // Load data from the fixture file
        cy.fixture("example.json").then((data) => {
            // Visit the URL specified in the fixture data
            cy.visitUrl(data.EntryValues.url)
            cy.log("Navigated to FTA - Federal Tax Authority Successfully");

            // Perform login using the credentials and locators from the fixture data
            cy.login(data.LocatorsPath.emailInputField_id,
                data.AuthDetails.email,
                data.LocatorsPath.passwordInputField_id,
                data.AuthDetails.password,
                data.LocatorsPath.captchaInputField_id,
                data.LocatorsPath.captcha_element_id,
                data.LocatorsPath.loginButton_id,
                "ex202apwdz.cy.js"
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
            cy.selectExcise(data.locators_ex202apwdz.EX202APWDZ_container_id,
                data.locators_ex202apwdz.EX202APWDZ_title_id,
                data.locators_ex202apwdz.EX202APWDZ_description_id,
                data.locators_ex.EX_createNew_id,
                "EX202A",
                data.EntryValues.EX202APWDZ_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // Input the designated zone number
            cy.inputField(data.locators_ex.EX_zone_id, data.EntryValues.EX202APWDZ_zone_number)
            // click validate button
            cy.clickXpathElement(data.locators_ex.Ex_validate_xpath)
            //enter the Release date
            cy.inputField(data.locators_ex.EX_export_date_id, data.EntryValues.EX202APWDZ_production_date)
            //clicking on next button
            cy.clickXpathElement(data.locators_ex.EX_next_xpath)
            // download the excel template
            cy.clickElement(data.locators_ex.EX_download_id)
            // upload the file
            cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX202APWDZ_filePath)
        })
    });
})