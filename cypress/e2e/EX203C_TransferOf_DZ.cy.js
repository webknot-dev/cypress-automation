describe("Automating EX203C Transfer of Ownership within Designated Zones", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX203C - Transfer of Ownership within Designated Zones", () => {
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
                "ex202adz.cy.js"
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
            cy.selectExcise(data.locators_EX203C_TDZ.EX203CTDZ_container_id,
                data.locators_EX203C_TDZ.EX203CTDZ_title_id,
                data.locators_EX203C_TDZ.EX203CTDZ_description_id,
                data.locators_ex.EX_createNew_id,
                "EX203C",
                data.locators_EX203C_TDZ.EX203CTDZ_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
           

            //Enter Purchaser TRN

            cy.clickElement(data.locators_EX203C_TDZ.EX203CTDZ_Purchaser_trn_id);

            cy.inputField(data.locators_EX203C_TDZ.EX203CTDZ_Purchaser_trn_id, data.locators_EX203C_TDZ.EX203CTDZ_Purchaser_trn_value)
          
            cy.clickElement(data.locators_EX203C_TDZ.Validate_button);

            //date
            cy.scrollToView(data.locators_EX203C_TDZ.date_field_xpath);
            cy.selectingDate(data.locators_EX203C_TDZ.date_field_xpath,data.locators_EX203C_TDZ.date)

            //upload_image
            cy.uploadFile(
                data.locators_EX203C_TDZ.upload_image_id,
                data.locators_EX203C_TDZ.fileName_path,
                // data.locators_EX203C_TDZ.upload_button_xpath, 
                data.locators_EX203C_TDZ.okButtonSelector1_xpath,
                data.locators_EX203C_TDZ.okButtonSelector2_xpath,
              );
           
            cy.clickElement(data.locators_EX203C_TDZ.next_step_id);

            cy.scrollToView(data.locators_EX203C_TDZ.dezignated_zone_xpath);
            cy.inputField(data.locators_EX203C_TDZ.dezignated_zone_xpath, data.locators_EX203C_TDZ.dz_number);
            cy.clickElement(data.locators_EX203C_TDZ.Dz_validate_xpath);

            //Click on next step
            cy.clickElement(data.locators_EX203C_TDZ.next_step_id_dz);

            cy.uploadingFile(data.locators_ex.EX_upload_id, data.locators_EX203B_LostnDeclare.EX203C_filePath)


        })
    });
})