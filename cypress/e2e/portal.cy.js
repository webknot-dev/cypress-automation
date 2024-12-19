import UtilityFunctions from '../support/UtilityFuctions'
const utils = new UtilityFunctions();

describe('Captcha Handling Test', () => {

  before(() => {
    cy.viewport(1024, 764)
  })

  it('should solve the captcha and log in', () => {

    cy.fixture('example').then((data) => {

      //Navigate to FTA Portal
      utils.get(data.EntryValues.url);
      cy.wait(25000)
      cy.wait(5000)
      console.log("Navigated to FTA - Federal Tax Authority Successfully");

      //Login to FTA Portal
      utils.login(data.LocatorsPath.emailInputField_id,
        data.AuthDetails.email,
        data.LocatorsPath.passwordInputField_id,
        data.AuthDetails.password,
        data.LocatorsPath.captchaInputField_id,
        data.LocatorsPath.captcha_element_id,
        data.LocatorsPath.loginButton_id,
        "portal.cy.js"
      )

      console.log("Login Successfully Done");


      cy.wait(5000)
      //Validate Login text
      utils.waitForElementPresence(data.LocatorsPath.login_text_validation_id)
      console.log("Login Text is present and validated");

      cy.wait(5000)
      //Click on Ramada Hotel & Suites Sharjah profile
      utils.waitAndClick(data.LocatorsPath.taxableProfileButton_xpath)
      console.log("Clicked on Ramada Hotel & Suites Sharjah 0th index");

      cy.wait(5000)

      //Close the pop up if theres any 
      utils.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath, data.LocatorsPath.Alert_Accept_xpath)
      console.log("Closed pop up");
      cy.wait(5000)

      //Print tax number
      utils.waitForElementPresence(data.LocatorsPath.TRN_validation_Xpath)
      console.log("Validated TRN");

      cy.wait(5000)

      //Click on the Excise-Tax
      utils.waitAndClick(data.LocatorsPath.exciseTax_xpath);
      console.log("Clicked on excise tax");

      cy.wait(5000)

    });
  });
});
