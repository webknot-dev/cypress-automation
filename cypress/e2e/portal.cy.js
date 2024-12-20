import UtilityFunctions from '../support/UtilityFunctions'
const utils = new UtilityFunctions();

describe('Captcha Handling Test', () => {

  before(() => {
    cy.viewport(1024, 764);
    cy.clearCookies();         // Clears all cookies
    cy.clearLocalStorage();    // Clears all local storage
    cy.reload();
  })

  it('should solve the captcha and log in', () => {

    cy.fixture('example').then((data) => {

      //Navigate to FTA Portal
      cy.visitUrl(data.EntryValues.url);
      cy.wait(25000)
      cy.wait(5000)
      console.log("Navigated to FTA - Federal Tax Authority Successfully");

      //Validate Login text
      cy.waitForElementPresence(data.LocatorsPath.login_text_validation_id)
      console.log("Login Text is present and validated");
      cy.wait(5000)

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
         




      //Print tax number
      // cy.waitForElementPresence(data.LocatorsPath.TRN_validation_Xpath)
      // console.log("Validated TRN");

      // cy.wait(5000)

      //Click on the Excise-Tax
      cy.waitAndClick(data.LocatorsPath.exciseTax_xpath);
      console.log("Clicked on excise tax");

      cy.wait(5000)


      //Click on Ex-201 
      cy.waitAndClick(data.LocatorsPath.EX201_create_new_id);
      console.log("Clicked on 201 tax");
      cy.wait(5000)

      //scroll into view
      cy.scrollToView(data.LocatorsPath.EX201_check_box_id);
      cy.wait(3000)

      //click on confirmation heck box - #_INST_A_00_CHECKBOX_CHK_checkbox
      cy.waitAndClick(data.LocatorsPath.EX201_check_box_id);
      cy.wait(3000)

      //click on start -#__xmlview19--idFormStart-inner

      cy.waitAndClick(data.LocatorsPath.Ex201_start_button);
      cy.wait(3000)

      //dropdown
      cy.selectListItem(data.LocatorsPath.dropDownEOI_id, data.EntryValues.EOI_targetItem);
      cy.wait(3000)

      //select date
      cy.selectingDate(data.EntryValues.date_selector, data.EntryValues.target_date_value);
      cy.wait(3000)

      //Radio button
      cy.waitAndClick(data.LocatorsPath.releaseFromDZButton_xpath);

      cy.quit();





    });
  });
});
