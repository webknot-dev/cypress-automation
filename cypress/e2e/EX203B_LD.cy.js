describe("Automating EX203B - Lost & Damaged Declaration", () => {
    before(function () {
        // Load fixtures and set aliases
        cy.fixture("common.json").as("commonData");
        cy.fixture("EX203B.json").as("testData");
        // Set the viewport size for the tests
        cy.viewport(1024, 764);
    });

    it("EX203B - Lost & Damaged Declaration", function () {
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
            "EX203B_LD.cy.js"
        );
        cy.validateEmail();

        // Click on the taxable profile button
        cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath);
        cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept);
        cy.validateStatusAndTRN("Active", data.Values.TRN);

        // Click on the excise tax button
        cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

        // Select the excise option
        cy.selectExcise(
            data.locators_EX203B_LostnDeclare.EX203BLD_container_id,
            data.locators_EX203B_LostnDeclare.EX203BLD_title_id,
            data.locators_EX203B_LostnDeclare.EX203BLD_description_id,
            data.locators_ex.EX_createNew_id,
            "EX203B",
            data.locators_EX203B_LostnDeclare.EX203BLD_Description
        );

        // Validate and proceed with the form
        cy.clickElement(data.locators_ex.EX_checkbox_id);
        cy.clickXpathElement(data.locators_ex.EX_Start_xpath);
        cy.inputField(data.locators_ex.EX_zone_id, data.locators_EX203B_LostnDeclare.EX203BLD_zone_number);
        cy.clickElement(data.locators_EX203B_LostnDeclare.Validate_button);
        //Validate dezignated zone details
        cy.validateOriginDZDetails();

        // Input date
        cy.wait(5000);
        cy.selectingDate(data.locators_EX203B_LostnDeclare.date_field_xpath, data.locators_EX203B_LostnDeclare.date);

        // Click next and upload mandatory files
        cy.clickXpathElement(data.locators_ex.EX_next_xpath);
        // cy.clickElement(data.locators_ex.EX_download_id);
        cy.uploadingFile(data.locators_ex.EX_upload_id, data.locators_EX203B_LostnDeclare.EX203BLD_filePath);

        // Select dropdown options for Lost & Damaged Declaration
        cy.scrollToView(data.locators_EX203B_LostnDeclare.loss_damaged_xpath);
        cy.clickElement(data.locators_EX203B_LostnDeclare.loss_damaged_xpath);
        cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.LossDamaged_dropDown_xpath, data.locators_EX203B_LostnDeclare.LossDamaged_dropDown_Value);

        //image
        cy.uploadFile(
            data.locators_EX203B_LostnDeclare.upload_image_id,
            data.locators_EX203B_LostnDeclare.fileName_path,
            // data.locators_EX203B_LostnDeclare.Drag_n_drop_selector,
            data.locators_EX203B_LostnDeclare.okButtonSelector1_xpath,
            data.locators_EX203B_LostnDeclare.okButtonSelector2_xpath
        );
        // cy.get("EVLD_1-drag-drop-area").selectFile(data.locators_EX203B_LostnDeclare.fileName_path, { action: 'drag-drop' })

        // Select reason of damage
        cy.scrollToView(data.locators_EX203B_LostnDeclare.reason_damaged_xpath);
        cy.clickElement(data.locators_EX203B_LostnDeclare.reason_damaged_xpath);
        cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.ReasonForLoss_dropDown_xpath, data.locators_EX203B_LostnDeclare.ReasonForLoss_dropDown_value);

        // Select place of destruction
        cy.scrollToView(data.locators_EX203B_LostnDeclare.placeOfDestruction_xpath);
        cy.clickElement(data.locators_EX203B_LostnDeclare.placeOfDestruction_xpath);
        cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.placeOfDestruction_dropdown_xpath, data.locators_EX203B_LostnDeclare.placeOfDestruction_dropdown_value);

        // Select external facility
        cy.scrollToView(data.locators_EX203B_LostnDeclare.external_facility_xpath);
        cy.clickElement(data.locators_EX203B_LostnDeclare.external_facility_xpath);
        cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.external_facility_dropdown_xpath, data.locators_EX203B_LostnDeclare.external_facility_dropdown_value);

        // Select Emirates
        cy.scrollToView(data.locators_EX203B_LostnDeclare.emirate_xpath);
        cy.clickElement(data.locators_EX203B_LostnDeclare.emirate_xpath);
        cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.emirate_dropdown_xpath, data.locators_EX203B_LostnDeclare.emirate_dropdown_value);

        // Proceed to the next step
        cy.wait(5000);

        cy.clickElementWithXpath(data.locators_EX203B_LostnDeclare.next_step_id);
    });
});
