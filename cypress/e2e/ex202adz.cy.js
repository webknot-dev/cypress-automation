describe("Automating EX202A consumption of goods with designated zone", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202A - DZ", () => {
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
            cy.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath, data.LocatorsPath.Alert_Accept_xpath)
            // Wait for the TRN validation element to be present
            cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // // Select the excise option using the locators and values from the fixture data
            // cy.selectExcise(data.locators_ex202adz.EX202ADZ_container_id,
            //     data.locators_ex202adz.EX202ADZ_title_id,
            //     data.locators_ex202adz.EX202ADZ_description_id,
            //     data.locators_ex202adz.EX202ADZ_createNew_id,
            //     "EX202A",
            //     data.EntryValues.EX202ADZ_Description
            // )

            // // Click on the checkbox to agree to terms
            // cy.clickElement(data.locators_ex202adz.EX202ADZ_checkbox_id)
            // // Click on the start button to begin the process
            // cy.clickElement(data.locators_ex202adz.EX202ADZ_Start_id)
            // // Input the designated zone number
            // cy.inputField(data.locators_ex202adz.EX202ADZ_zone_id, data.EntryValues.EX202ADZ_zone_number)
        })
    });
})