describe("Automating EX201 - ", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX201 - Release from designated zone", () => {
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
                "ex201dz.cy.js"
            )

            // Click on the taxable profile button
            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            // Close any popup if present
            cy.closePopupIfPresent(data.LocatorsPath.data.LocatorsPath.PopUp_Selector, data.LocatorsPath.Alert_Accept_xpath)
            // Wait for the TRN validation element to be present
            cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_ex201im.EX201IM_container_id,
                data.locators_ex201im.EX201IM_title_id,
                data.locators_ex201im.EX201IM_description_id,
                data.locators_ex201im.EX201IM_createNew_id,
                "EX201",
                data.EntryValues.EX201IM_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex201im.EX201IM_checkbox_id)
            // Click on the start button to begin the process
            cy.clickElement(data.locators_ex201im.EX201IM_Start_id)
            // click on "release from designated zone" radio button
            cy.clickElement(data.locators_ex201dz.EX201DZ_DZ_id)
            // input date 
            cy.selectingDate(data.locators_ex201im.EX201IM_date_id, data.EntryValues.EX201IM_date)
            // selecting Emirate of Import 
            cy.clickElement(data.locators_ex201dz.EX201DZ_emirates_DropDown_id)
            cy.selectFromDropdown(data.locators_ex201im.EX201IM_emirates_list_id, data.EntryValues.EX201DZ_emirates)
            // Entering DZ Zone ID
            cy.inputField(data.locators_ex201dz.EX201DZ_zone_id, data.EntryValues.EX201DZ_zone_number)
        })
    });
})