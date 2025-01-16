describe("Automating EX202A Import to Designated Zone (No Customs Check)", () => {
    before(function () {
        cy.fixture("common.json").as("commonData")
        cy.fixture("ex202aidznccre.json").as("testData")
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202A - IDZ(NCC) IMPORT - RE IMPORT", function () {
        // Load data from the fixture file
        const data = { ...this.testData, ...this.commonData }
        // Visit the URL specified in the fixture data
        cy.visitUrl(data.Values.url)
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
            "ex202aidznccre.cy.js"
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
        cy.selectExcise(data.locators_ex202aidzncc.EX202AIDZNCC_container_id,
            data.locators_ex202aidzncc.EX202AIDZNCC_title_id,
            data.locators_ex202aidzncc.EX202AIDZNCC_description_id,
            data.locators_ex.EX_createNew_id,
            "EX202A",
            data.EntryValues.EX202AIDZNCC_Description
        )
        // validate the form page url
        cy.validateUrl(data.EntryValues.EX202AIDZNCC_url)

        // Click on the checkbox to agree to terms
        cy.clickElement(data.locators_ex.EX_checkbox_id)
        // Click on the start button to begin the process
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
        // validate trn
        cy.validateTRNandName(data.Values.TRN, data.Values.name)
        // click on "import to re export" radio button
        cy.clickElement(data.locators_ex202aidzncc.EX202AIDZNCC_re_export_id)

        // Entering Zone ID
        cy.inputField(data.locators_ex.EX_zone_id, data.EntryValues.EX202AIDZNCC_RE_zone_number)

        // click validate button
        cy.clickXpathElement(data.locators_ex.Ex_validate_xpath)

        // selecting Port of Entry
        cy.clickElement(data.locators_ex.EX_Port_DropDown_id)
        cy.selectFromDropdown(data.locators_ex.EX_port_list_id, data.EntryValues.EX202AIDZNCC_RE_Port)

        //enter the import date
        cy.inputField(data.locators_ex.EX_export_date_id, data.EntryValues.EX202AIDZNCC_RE_import_date)
        //clicking on next button
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)
        // download the excel template
        // cy.clickElement(data.locators_ex.EX_download_id)
        // upload the file
        cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX202AIDZNCC_RE_filePath)
    })
});