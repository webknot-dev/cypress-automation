describe("Automating EX203B - Lost & Damaged Declaration", () => {
    before(() => {
        // Set the viewport size for the tests
        cy.viewport(1024, 764)
    })
    it("EX203B - Lost & Damaged Declaration", () => {
        // Load data from the fixture file
        cy.fixture("example.json").then((data) => {
            // Visit the URL specified in the fixture data
            cy.visitUrl(data.EntryValues.url)
            cy.validateUrl(data.EntryValues.url);
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
            cy.validateEmail();

            // Click on the taxable profile button
            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            // Close any popup if present
            cy.closePopupIfPresent(data.LocatorsPath.PopUp_Selector, data.LocatorsPath.PopUp_Accept)
            // Wait for the TRN validation element to be present
            cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            cy.validateStatusAndTRN('Active', data.EntryValues.validate_trn);

            // Click on the excise tax button
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            // Select the excise option using the locators and values from the fixture data
            cy.selectExcise(data.locators_EX203B_LostnDeclare.EX203BLD_container_id,
                data.locators_EX203B_LostnDeclare.EX203BLD_title_id,
                data.locators_EX203B_LostnDeclare.EX203BLD_description_id,
                data.locators_ex.EX_createNew_id,
                "EX203B",
                data.EntryValues.EX203BLD_Description
            )

            // Click on the checkbox to agree to terms
            cy.clickElement(data.locators_ex.EX_checkbox_id)
            // Click on the start button to begin the process
            cy.clickXpathElement(data.locators_ex.EX_Start_xpath)
            // Input the designated zone number
            cy.inputField(data.locators_ex.EX_zone_id, data.EntryValues.EX202ADZ_zone_number)

            //CLICK ON VALIDATE
            cy.clickElement(data.locators_EX203B_LostnDeclare.Validate_button);


            //Add dates
            cy.wait(5000)
            
            

            
            cy.selectingDate(data.locators_EX203B_LostnDeclare.date_field_xpath,data.locators_EX203B_LostnDeclare.date)
            cy.clickXpathElement(data.locators_ex.EX_next_xpath)

            cy.clickElement(data.locators_ex.EX_download_id)

            //UPLOAD Excise goods 

            //Filling  out the mandatory details

            cy.uploadingFile(data.locators_ex.EX_upload_id, data.locators_EX203B_LostnDeclare.EX203BLD_filePath)


            //DropDown - Lost and Damaged Declaration
            cy.scrollToView(data.locators_EX203B_LostnDeclare.loss_damaged_xpath)

            cy.clickElement(data.locators_EX203B_LostnDeclare.loss_damaged_xpath)
            cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.LossDamaged_dropDown_xpath, data.locators_EX203B_LostnDeclare.LossDamaged_dropDown_Value);

            cy.uploadingFile(data.locators_ex.upload_image_id, data.locators_EX203B_LostnDeclare.image_path)

            
            //DropDown - Reason of damage
            cy.scrollToView(data.locators_EX203B_LostnDeclare.reason_damaged_xpath)
            cy.clickElement(data.locators_EX203B_LostnDeclare.reason_damaged_xpath)

            cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.ReasonForLoss_dropDown_xpath, data.locators_EX203B_LostnDeclare.ReasonForLoss_dropDown_value);



             //DropDown - Place of Destruction
            cy.scrollToView(data.locators_EX203B_LostnDeclare.placeOfDestruction_xpath)
            cy.clickElement(data.locators_EX203B_LostnDeclare.placeOfDestruction_xpath)
 
            cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.placeOfDestruction_dropdown_xpath, data.locators_EX203B_LostnDeclare.placeOfDestruction_dropdown_value);
 

            //DropDown - External Facility
            cy.scrollToView(data.locators_EX203B_LostnDeclare.external_facility_xpath)
            cy.clickElement(data.locators_EX203B_LostnDeclare.external_facility_xpath)
  
            cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.external_facility_dropdown_xpath, data.locators_EX203B_LostnDeclare.external_facility_dropdown_value);
  

             //DropDown - Emirates
            cy.scrollToView(data.locators_EX203B_LostnDeclare.emirate_xpath)
            cy.clickElement(data.locators_EX203B_LostnDeclare.emirate_xpath)
  
            cy.selectFromDropdown(data.locators_EX203B_LostnDeclare.emirate_dropdown_xpath, data.locators_EX203B_LostnDeclare.emirate_dropdown_value);
            cy.clickElement(data.locators_EX203B_LostnDeclare.next_step_id)

             

        })
    });
})