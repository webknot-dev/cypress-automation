describe("Automating EX203 - Deductible Excise Tax Form", () => {
    before(function () {
        cy.fixture("common.json").as("commonData")
        cy.fixture("ex203detf.json").as("testData")
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX203 - DETF", function () {
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
            "ex203detf.cy.js"
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
        // Close any popup if present
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)

        // Select the excise option using the locators and values from the fixture data
        cy.selectExcise(data.locators_ex203detf.EX203DETF_container_id,
            data.locators_ex203detf.EX203DETF_title_id,
            data.locators_ex203detf.EX203DETF_description_id,
            data.locators_ex.EX_createNew_id,
            "EX203",
            data.EntryValues.EX203DETF_Description
        )

        // validate the form page url
        cy.validateUrl(data.EntryValues.EX203DETF_url)

        // Click on the checkbox to agree to terms
        cy.clickElement(data.locators_ex.EX_checkbox_id)
        // Click on the start button to begin the process
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
        // validate trn
        cy.validateTRNandName(data.Values.TRN, data.Values.name)
        // enter period of Declaration
        cy.inputField(data.locators_ex.EX_export_date_id, data.EntryValues.EX203DETF_period)
        //clicking on next button
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)
        // select reason for credit claim
        cy.clickElement(data.locators_ex203detf.EX203DETF_reason_id)
        cy.selectFromDropdown(data.locators_ex203detf.EX203DETF_reason_list_id, data.EntryValues.EX203DETF_reason)
        //upload or drag drop Document Proof
        cy.get(data.locators_ex203detf.EX203DETF_upload_id).selectFile(data.EntryValues.EX203DETF_document_path, { action: 'drag-drop', force: true })
        // Close any popup if present
        cy.closeDialogIfPresent()
        //clicking on next button
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)

    });
})