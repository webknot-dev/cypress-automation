describe("Automating EX202A Release Goods from Designated Zone into Free Circulation (No Customs Check)", () => {
    before(function () {
        cy.fixture("common.json").as("commonData")
        cy.fixture("ex202argdzncc.json").as("testData")
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202A - RGDZ(NCC)", function () {
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
            "ex202argdzncc.cy.js"
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
        cy.selectExcise(data.locators_ex202argdzncc.EX202ARGDZNCC_container_id,
            data.locators_ex202argdzncc.EX202ARGDZNCC_title_id,
            data.locators_ex202argdzncc.EX202ARGDZNCC_description_id,
            data.locators_ex.EX_createNew_id,
            "EX202A",
            data.EntryValues.EX202ARGDZNCC_Description
        )

        // validate the form page url
        cy.validateUrl(data.EntryValues.EX202ARGDZNCC_url)

        // Click on the checkbox to agree to terms
        cy.clickElement(data.locators_ex.EX_checkbox_id)
        // Click on the start button to begin the process
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
        // validate trn
        cy.validateTRNandName(data.Values.TRN, data.Values.name)
        // Input the designated zone number
        cy.inputField(data.locators_ex.EX_zone_id2, data.EntryValues.EX202ARGDZNCC_zone_number)
        // click validate button
        cy.clickXpathElement(data.locators_ex.Ex_validate_xpath)
        // Validate designated zone details 
        cy.validateDZDetails_ex202Argdz();
        //enter the Release date
        cy.inputField(data.locators_ex.EX_export_date_id, data.EntryValues.EX202ARGDZNCC_release_date)
        //clicking on next button
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)
        // download the excel template
        // cy.clickElement(data.locators_ex.EX_download_id)
        // upload the file
        cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX202ARGDZNCC_filePath)
    })
});