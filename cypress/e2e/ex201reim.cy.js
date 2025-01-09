describe("Automating EX201 - Import for Re-export ", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX201 - RImport for Re-export ", () => {
        // Load data from the fixture file
        cy.fixture("example.json").then((data) => {
            // Visit the URL specified in the fixture data
            cy.visitUrl(data.Values.url)
            cy.log("Navigated to FTA - Federal Tax Authority Successfully");

            // Perform login using the credentials and locators from the fixture data
            cy.login(data.LocatorsPath.emailInputField_id,
                data.AuthDetails.email,
                data.LocatorsPath.passwordInputField_id,
                data.AuthDetails.password,
                data.LocatorsPath.captchaInputField_id,
                data.LocatorsPath.captcha_element_id,
                data.LocatorsPath.loginButton_id,
                "ex201reim.cy.js"
            )
            //validate the landing page url
            cy.validateUrl(data.Values.land_url)
            // validate the Email ID
            cy.validateEmail()

            // Click on the taxable profile button
            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            // Close any popup if present
            cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)
            // validate status and TRN
            cy.validateStatusAndTRN("Active", data.Values.TRN)
            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_ex201im.EX201IM_container_id,
                data.locators_ex201im.EX201IM_title_id,
                data.locators_ex201im.EX201IM_description_id,
                data.locators_ex.EX_createNew_id,
                "EX201",
                data.EntryValues.EX201IM_Description
            )

            // validate the form page url
            cy.validateUrl(data.EntryValues.EX201IM_url)

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // validate trn
            cy.validateTRNandName(data.Values.TRN, data.Values.name)
            // click on "import for re-export" radio button
            cy.clickElement(data.locators_ex201reim.EX201REIM_reim_id)
            // input date 
            cy.selectingDate(data.locators_ex.EX_date_id, data.EntryValues.EX201REIM_date)
            // selecting Emirate of Import 
            cy.clickElement(data.locators_ex.EX_emirates_DropDown_id)
            cy.selectFromDropdown(data.locators_ex.EX_emirates_list_id, data.EntryValues.EX201REIM_emirates)
            // selecting Port of Entry
            cy.clickElement(data.locators_ex.EX_Port_DropDown_id)
            cy.selectFromDropdown(data.locators_ex.EX_port_list_id, data.EntryValues.EX201REIM_port)
            //clicking on next button
            cy.clickXpathElement(data.locators_ex.EX_next_xpath)
            cy.clickElement(data.locators_ex.EX_download_id)
            // upload the file
            cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX201IM_filePath)
        })
    });
})