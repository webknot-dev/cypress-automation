describe("Automating EX202A -Transfer Goods to Another Designated Zone", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX202A -Transfer Goods to Another Designated Zone", () => {
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
            cy.selectExcise(data.locators_EX202A_EGDZ.EX202EGDZ_container_id,
                data.locators_EX202A_EGDZ.EX202EGDZ_title_id,
                data.locators_EX202A_EGDZ.EX202EGDZ_description_id,
                data.locators_ex.EX_createNew_id,
                "EX202A",
                data.EntryValues.EX202AEGDZ_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // Input the designated zone number
            cy.inputField(data.locators_ex.EX_zone_id, data.EntryValues.EX202ADZ_zone_number)

            //CLICK ON VALIDATE
            cy.clickElement(data.locators_EX202A_EGDZ.Validate_button);


            //Add dates
            cy.wait(5000)
            cy.scrollToView(data.locators_EX202A_EGDZ.date_field_xpath);
            cy.selectingDate(data.locators_EX202A_EGDZ.date_field_xpath,data.locators_EX202A_EGDZ.date)
            cy.clickElement(data.locators_EX202A_EGDZ.next_step_id)



        })
    });
})