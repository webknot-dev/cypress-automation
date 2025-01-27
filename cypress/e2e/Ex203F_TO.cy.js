describe("Automating EX203F - Transfer of Ownership within Designated Zone – Registered Seller to Non-Registered Purchaser", () => {
    before(function () {
        // Load fixtures and set aliases
        cy.fixture("common.json").as("commonData");
        cy.fixture("EX203F.json").as("testData");
        // Set the viewport size for the tests
        cy.viewport(1024, 764);
    });

    it("EX203F", function () {
        // Merge data from the fixture files
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
            "Ex203F_TO.cy.js"
        );

        // Validate the email and navigate to the taxable profile
        cy.validateEmail();
        cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath);
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept);
        // cy.validateStatusAndTRN("Active", data.EntryValues.validate_trn);
        cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

        // Select the excise option
        cy.selectExcise(
            data.locators_EX203F.EX203F_container_id,
            data.locators_EX203F.EX203F_title_id,
            data.locators_EX203F.EX203F_description_id,
            data.locators_ex.EX_createNew_id,
            "EX203F",
            data.locators_EX203F.EX203F_Description
        );

        // Validate the form page URL and proceed
        cy.validateUrl(data.locators_EX203F.EX203F_url);
        cy.clickElement(data.locators_ex.EX_checkbox_id);
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath);

        // Enter Purchaser TRN
        cy.clickElement(data.locators_EX203F.Ex203F_Dz_zone);
        cy.inputField(data.locators_EX203F.Ex203F_Dz_zone, data.locators_EX203F.EX203F_dz_number);
        cy.clickElement(data.locators_EX203F.Validate_button);
        //Validate details of Designated zone number
        cy.validateDZDetails();

        // Input the date
        cy.scrollToView(data.locators_EX203F.date_field_xpath);
        cy.selectingDate(data.locators_EX203F.date_field_xpath, data.locators_EX203F.date);

        // Upload the image
        cy.uploadFile(
            data.locators_EX203F.upload_image_id,
            data.locators_EX203F.fileName_path,
            data.locators_EX203F.okButtonSelector1_xpath,
            data.locators_EX203F.okButtonSelector2_xpath
        );

        // Proceed to the next step
        cy.clickXpathElement(data.locators_ex.EX_next_xpath)
        cy.uploadingFile(data.locators_ex.EX_upload_id, data.locators_EX203F.EX203F_filePath);
    });
});
