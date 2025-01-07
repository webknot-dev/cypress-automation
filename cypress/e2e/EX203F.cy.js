describe("Automating EX203F - Transfer of Ownership within Designated Zone – Registered Seller to Non-Registered Purchaser", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX203F", () => {
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


            // cy.scrollToView(data.locators_EX203F.EX203F_container_id);
            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_EX203F.EX203F_container_id,
                data.locators_EX203F.EX203F_title_id,
                data.locators_EX203F.EX203F_description_id,
                data.locators_ex.EX_createNew_id,
                "EX203F",
                data.locators_EX203F.EX203F_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
           

            //Enter Purchaser TRN

            cy.clickElement(data.locators_EX203F.Ex203F_Dz_zone);

            cy.inputField(data.locators_EX203F.Ex203F_Dz_zone, data.locators_EX203F.EX203F_dz_number);

            cy.clickElement(data.locators_EX203F.Validate_button);

            //date

            cy.scrollToView(data.locators_EX203F.date_field_xpath);
            cy.selectingDate(data.locators_EX203F.date_field_xpath,data.locators_EX203C_TDZ.date)

            //uploading image
            cy.uploadFile(
                data.locators_EX203F.upload_image_id,
                data.locators_EX203F.fileName_path,
                // data.locators_EX203C_TDZ.upload_button_xpath, 
                data.locators_EX203F.okButtonSelector1_xpath,
                data.locators_EX203F.okButtonSelector2_xpath,
              );
           
            cy.clickElement(data.locators_EX203F.next_step_id_dz);
            cy.uploadingFile(data.locators_ex.EX_upload_id, data.locators_EX203F.EX203F_filePath)

        })
    });
})