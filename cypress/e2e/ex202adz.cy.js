describe("Automating EX202A consumption of goods with designated zone", () => {
    before(() => {
        cy.viewport(1024, 764)
    })
    it("EX202A - DZ", () => {
        cy.fixture("example.json").then((data) => {
            cy.visitUrl(data.EntryValues.url)
            cy.log("Navigated to FTA - Federal Tax Authority Successfully");
            cy.login(data.LocatorsPath.emailInputField_id,
                data.AuthDetails.email,
                data.LocatorsPath.passwordInputField_id,
                data.AuthDetails.password,
                data.LocatorsPath.captchaInputField_id,
                data.LocatorsPath.captcha_element_id,
                data.LocatorsPath.loginButton_id,
                "ex202adz.cy.js"
            )

            cy.clickXpathElement(data.LocatorsPath.taxableProfileButton_xpath)
            cy.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath, data.LocatorsPath.Alert_Accept_xpath)
            cy.waitForXpathElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);

            cy.selectExcise(data.locators_ex202adz.EX202ADZ_container_id,
                data.locators_ex202adz.EX202ADZ_title_id,
                data.locators_ex202adz.EX202ADZ_description_id,
                data.locators_ex202adz.EX202ADZ_createNew_id,
                "EX202A",
                data.EntryValues.EX202ADZ_Description
            )

            cy.clickElement(data.locators_ex202adz.EX202ADZ_checkbox_id)
            cy.clickElement(data.locators_ex202adz.EX202ADZ_Start_id)
            cy.inputField(data.locators_ex202adz.EX202ADZ_zone_id, data.EntryValues.EX202ADZ_zone_number)

        })
    });
})