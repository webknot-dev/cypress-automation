describe("Automating EX202A - Enter Goods into a Designated Zone", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.fixture("common.json").as("commonData");
        cy.fixture("EX202AEGDZ.json").as("testData");
        cy.viewport(1024, 764);
    });

    it("EX202A - Enter Goods into a Designated Zone", function () {
        // Load data from the fixture file
        const data = { ...this.testData, ...this.commonData };

        // Visit the URL specified in the fixture data
        cy.visitUrl(data.Values.url);
        cy.validateUrl(data.Values.url);
        cy.log("Navigated to FTA - Federal Tax Authority Successfully");

        // Perform login using the credentials and locators from the fixture data
        cy.login(
            data.LocatorsPath.emailInputField_id,
            Cypress.env('email'),
            data.LocatorsPath.passwordInputField_id,
            Cypress.env('password'),
            data.LocatorsPath.captchaInputField_id,
            data.LocatorsPath.captcha_element_id,
            data.LocatorsPath.loginButton_id,
            "EX202A_EGDZ.cy.js"
        );

        cy.validateEmail();

        // Click on the taxable profile button
        cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath);

        // Close any popup if present
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept);

        // Wait for the TRN validation element to be present
        cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath);

        // Validate status and TRN
        cy.validateStatusAndTRN("Active", data.Values.TRN);

        // Click on the excise tax button
        cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);
        // Close any popup if present
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)

        // Select the excise option using the locators and values from the fixture data
        cy.selectExcise(
            data.locators_EX202A_EGDZ.EX202EGDZ_container_id,
            data.locators_EX202A_EGDZ.EX202EGDZ_title_id,
            data.locators_EX202A_EGDZ.EX202EGDZ_description_id,
            data.locators_ex.EX_createNew_id,
            "EX202A",
            data.locators_EX202A_EGDZ.EX202AEGDZ_Description
        );

        cy.validateUrl(data.locators_EX202A_EGDZ.EX202AEGDZ_url);

        // Click on the checkbox to agree to terms
        cy.clickElement(data.locators_ex.EX_checkbox_id);

        // Click on the start button to begin the process
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath);

        // Input the designated zone number
        cy.inputField(data.locators_ex.EX_zone_id, data.locators_EX202A_EGDZ.EX202ADZ_zone_number);

        // Click on Validate
        cy.clickElement(data.locators_EX202A_EGDZ.Validate_button);


        //Validate dezignated zone details
        cy.validateDZDetails();
        // Add dates
        cy.wait(5000);
        cy.scrollToView(data.locators_EX202A_EGDZ.date_field_xpath);
        cy.selectingDate(data.locators_EX202A_EGDZ.date_field_xpath, data.locators_EX202A_EGDZ.date);
        cy.wait(3000)
        // Proceed to the next step
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)
    });
});
