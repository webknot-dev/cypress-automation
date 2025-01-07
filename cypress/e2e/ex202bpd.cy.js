describe("Automating EX202B - Producer Declaration", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202B - PD", () => {
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
                "ex202bpd.cy.js"
            )
            //validate the landing page url
            cy.validateUrl(data.EntryValues.land_url)
            // validate the Email ID
            cy.validateEmail()

            // Click on the taxable profile button
            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            // Close any popup if present
            cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)
            // validate status and TRN
            cy.validateStatusAndTRN("Active", data.EntryValues.TRN)
            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_ex202bpd.EX202BPD_container_id,
                data.locators_ex202bpd.EX202BPD_title_id,
                data.locators_ex202bpd.EX202BPD_description_id,
                data.locators_ex.EX_createNew_id,
                "EX202B",
                data.EntryValues.EX202BPD_Description
            )

            // validate the form page url
            cy.validateUrl(data.EntryValues.EX202BPD_url)

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // select period of Declaration
            cy.clickElement(data.locators_ex.Ex_period_Dropdown_id)
            cy.selectFromDropdown(data.locators_ex.EX_period_list_id, data.EntryValues.EX202BPD_period)
            //clicking on next button
            cy.clickXpathElement(data.locators_ex.EX_next_xpath)
            // download the excel template
            cy.clickElement(data.locators_ex.EX_download_id)
            // upload the file
            cy.uploadingFile(data.locators_ex.EX_upload_id, data.EntryValues.EX202BPD_filePath)
        })
    });
})