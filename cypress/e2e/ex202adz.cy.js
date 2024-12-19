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
            cy.waitForElementPresence(data.LocatorsPath.TRN_validation_Xpath)
            cy.clickXpathElement(data.LocatorsPath.exciseTax_xpath);


        })
    });
})