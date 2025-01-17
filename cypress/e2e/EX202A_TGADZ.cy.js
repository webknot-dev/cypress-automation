describe("Automating EX202A - Transfer Goods to Another Designated Zone", function () {
    before(function () {
        // Set the viewport size for the tests
        cy.fixture("common.json").as("commonData");
        cy.fixture("EX202ATGADZ.json").as("testData");
        cy.viewport(1024, 764);
    });

    it("EX202A - Transfer Goods to Another Designated Zone", function () {
        // Load data from the fixture files
        const data = { ...this.testData, ...this.commonData };

        // Visit the URL specified in the fixture data
        cy.visitUrl(data.Values.url);
        cy.validateUrl(data.Values.url);
        cy.log("Navigated to FTA - Federal Tax Authority Successfully");

        // Perform login using the credentials and locators from the fixture data
        cy.login(
            data.LocatorsPath.emailInputField_id,
            data.AuthDetails.email,
            data.LocatorsPath.passwordInputField_id,
            data.AuthDetails.password,
            data.LocatorsPath.captchaInputField_id,
            data.LocatorsPath.captcha_element_id,
            data.LocatorsPath.loginButton_id,
            "EX202A_TGADZ.cy.js"
        );

        cy.validateEmail();

        // Click on the taxable profile button
        cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath);
        // Close any popup if present
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept);
        // Wait for the TRN validation element to be present
        cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath);
        cy.validateStatusAndTRN("Active", data.Values.TRN)

        // Click on the excise tax button
        cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

        // Select the excise option using the locators and values from the fixture data
        cy.selectExcise(
            data.locators_EX202A_TGADZ.EX202TGADZ_container_id,
            data.locators_EX202A_TGADZ.EX202TGADZ_title_id,
            data.locators_EX202A_TGADZ.EX202TGADZ_description_id,
            data.locators_ex.EX_createNew_id,
            "EX202A",
            data.locators_EX202A_TGADZ.EX202TGADZ_Description
        );

        // Click on the checkbox to agree to terms
        cy.clickElement(data.locators_ex.EX_checkbox_id);
        // Click on the start button to begin the process
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath);
        // Input the designated zone number
        cy.inputField(data.locators_EX202A_TGADZ.EX_zone_id, data.locators_EX202A_TGADZ.EX202TGAZ_zone_number);

        // CLICK ON VALIDATE
        cy.clickElement(data.locators_EX202A_TGADZ.Validate_button);

        // Add dates
        cy.wait(5000);
        cy.scrollToView(data.locators_EX202A_TGADZ.EX_dest_zone_id);

        cy.inputField(data.locators_EX202A_TGADZ.EX_dest_zone_id, data.locators_EX202A_TGADZ.EX202TGAZ_zone_number);
        cy.clickElement(data.locators_EX202A_TGADZ.Destination_validation_btnId);
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)



        // cy.uploadingFile(data.locators_EX202A_TGADZ.EX_upload_id, data.locators_EX202A_TGADZ.EX202ATGADZ_filePath);

    });
});
