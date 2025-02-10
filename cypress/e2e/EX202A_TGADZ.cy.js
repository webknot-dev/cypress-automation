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
            Cypress.env('email'),
            data.LocatorsPath.passwordInputField_id,
            Cypress.env('password'),
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
        // Close any popup if present
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)

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

        // Click on validate
        cy.clickElement(data.locators_EX202A_TGADZ.Validate_button);
        //Validate dezignated zone details
        cy.validateOriginDZDetails();
        // Add dates
        cy.wait(5000);
        cy.scrollToView(data.locators_EX202A_TGADZ.EX_dest_zone_id);

        //Enter destination designated zone
        cy.inputField(data.locators_EX202A_TGADZ.EX_dest_zone_id, data.locators_EX202A_TGADZ.EX202TGAZ_destZone_number);
        cy.clickElement(data.locators_EX202A_TGADZ.Destination_validation_btnId);
        cy.validateDestinationDZDetails();

        //Select ownership transfer - Yes
        // const radioButton = "Yes"
        // cy.clickElement(data.locators_EX202A_TGADZ.Radio_button_YES);

        // cy.scrollToView(data.locators_EX202A_TGADZ.Purchaser_trn_id);

        // //Enter purchaser trn
        // cy.inputField(data.locators_EX202A_TGADZ.Purchaser_trn_id, data.locators_EX202A_TGADZ.Purchaser_trn);

        // //Click validate trn
        // cy.clickElement(data.locators_EX202A_TGADZ.Validate_trn_button);

        // cy.scrollToView(data.locators_EX202A_TGADZ.date_field_xpath);
        // cy.selectingDate(data.locators_EX202A_TGADZ.date_field_xpath, data.locators_EX202A_TGADZ.date);

        // cy.wait(3000)

        // cy.clickElementWithXpath(data.locators_EX202A_TGADZ.next_step_id);

        // cy.uploadingFile(data.locators_EX202A_TGADZ.EX_upload_id, data.locators_EX202A_TGADZ.EX202ATGADZ_filePath);
        const radioButton = "No";

        if (radioButton === "Yes") {
            // Execute the required actions if the radio button is Yes
            cy.clickElement(data.locators_EX202A_TGADZ.Radio_button_YES);

            cy.scrollToView(data.locators_EX202A_TGADZ.Purchaser_trn_id);

            // Enter purchaser TRN
            cy.inputField(data.locators_EX202A_TGADZ.Purchaser_trn_id, data.locators_EX202A_TGADZ.Purchaser_trn);

            // Click validate TRN
            cy.clickElement(data.locators_EX202A_TGADZ.Validate_trn_button);

            cy.scrollToView(data.locators_EX202A_TGADZ.date_field_xpath);
            cy.selectingDate(data.locators_EX202A_TGADZ.date_field_xpath, data.locators_EX202A_TGADZ.date);

            cy.wait(3000);

            cy.clickElementWithXpath(data.locators_EX202A_TGADZ.next_step_id);

            cy.uploadingFile(data.locators_EX202A_TGADZ.EX_upload_id, data.locators_EX202A_TGADZ.EX202ATGADZ_filePath);
        } else {
            // Message for when the radio button is not "Yes"
            cy.log("Radio button is not selected as 'No'");
            cy.clickElement(data.locators_EX202A_TGADZ.Radio_button_NO);


            cy.scrollToView(data.locators_EX202A_TGADZ.date_field_xpath);
            cy.selectingDate(data.locators_EX202A_TGADZ.date_field_xpath, data.locators_EX202A_TGADZ.date);

            cy.wait(3000);

            cy.clickElementWithXpath(data.locators_EX202A_TGADZ.next_step_id);

            cy.uploadingFile(data.locators_EX202A_TGADZ.EX_upload_id, data.locators_EX202A_TGADZ.EX202ATGADZ_filePath);
        }


    });
});
