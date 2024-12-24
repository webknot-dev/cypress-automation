import UtilityFunctions from '../support/UtilityFunctions'
const utils = new UtilityFunctions();

describe('Captcha Handling Test', () => {

  before(() => {
    cy.viewport(1024, 764);
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload();
  })

  it('should solve the captcha and log in', () => {

    cy.fixture('example').then((data) => {

      //Navigate to FTA Portal
      cy.visitUrl(data.EntryValues.url);
      cy.wait(15000)
      cy.wait(5000)
      console.log("Navigated to FTA - Federal Tax Authority Successfully");

      //Validate Login text
      cy.waitForElementPresence(data.LocatorsPath.login_text_validation_id)
      console.log("Login Text is present and validated");
      cy.wait(3000)

      //Login to FTA Portal
      cy.login(data.LocatorsPath.emailInputField_id,
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


      //Click on Ramada Hotel & Suites Sharjah profile
      cy.waitAndClick(data.LocatorsPath.taxableProfileButton_xpath)
        .then(() => {
          console.log("Clicked on Ramada Hotel & Suites Sharjah 0th index");
        });

      cy.wait(5000)

      //Close the pop up if theres any 

      // cy.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath,data.LocatorsPath.Alert_Accept_xpath);
      // cy.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath, data.LocatorsPath.Alert_Accept_xpath);

      cy.closePopupIfPresent(data.LocatorsPath.Alert_Dialog_xpath, data.LocatorsPath.Alert_Accept_xpath);

      cy.wait(5000)



      //Print tax number
      // cy.waitForElementPresence(data.LocatorsPath.TRN_validation_Xpath)
      // console.log("Validated TRN");

      // cy.wait(5000)

      //Click on the Excise-Tax
      cy.waitAndClick(data.LocatorsPath.exciseTax_xpath);
      console.log("Clicked on excise tax");

      cy.wait(5000)


      //202A DZ
      cy.scrollToView(data.Locators_202A_Consum.EX202A_Consum_createNew_xpath);
      cy.wait(3000)


      cy.waitAndClick(data.Locators_202A_Consum.EX202A_Consum_createNew_xpath);
      cy.wait(2000);

      cy.scrollToView(data.Locators_202A_Consum.Ex202A_checkBox_xpath);
      cy.wait(5000)

      cy.waitAndClick(data.Locators_202A_Consum.Ex202A_checkBox_xpath);
      cy.wait(3000)

      cy.waitAndClick(data.Locators_202A_Consum.Ex202A_start_xpath);
      cy.wait(5000)

      cy.inputField(data.Locators_202A_Consum.Ex202A_DZ_input_xpath,data.Locators_202A.Dz_input_value)
      cy.wait(3000)

      cy.waitAndClick(data.Locators_202A_Consum.validate_xpath)
      cy.wait(3000)

      //Click on Ex



      cy.quit();





    });
  });
});
