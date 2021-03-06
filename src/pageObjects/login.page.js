import Page from './page';
import ElementHandler from '../utils/ElementHandler.js';
import ErrorMessage from '../utils/ErrorMessage.json'

const companyInput = 'input[placeholder="Company"]';
const usernameInput = 'input[placeholder="Username"]';
const passwordInput = 'input[placeholder="Password"]';
const submitButton = "//span[contains(@class, 'Login__button')]";
const headerImage = 'img[alt="Leap Logo"]';
const mainContentPage = "//div[contains(@class, 'MainLayout__container')]";
const notifyError = ".notification-container .message";

class LoginPage extends Page {
  open() {
    super.open('login');
    ElementHandler.verifyTitle('LeapXpert - Company Portal');
  }

  waitForloginPageToLoad() {
    ElementHandler.verifyElementDisabled(headerImage);
  }

  addCompany(company) {
    ElementHandler.addValue(companyInput, company);
    ElementHandler.click(submitButton);
    return this;
  }

  addUserAuth(username, password) {
    ElementHandler.addValue(usernameInput, username);
    ElementHandler.addValue(passwordInput, password);
    ElementHandler.click(submitButton);
    return this;
  }

  addSecurityCode(codes) {
    const arrayCodes = codes.split('');
    for (let i = 0; i < arrayCodes.length; i++) {
      let index = i + 1;
      let codeInput = `//div[contains(@class, "OTPInput__input")][${index}]/input`
      ElementHandler.addValue(codeInput, parseInt(arrayCodes[i]))
    }
    ElementHandler.click(submitButton);
    return this;
  }

  verifyErrorWithInvalidCompany(){
    ElementHandler.waitForElementDisplayed(notifyError);
    ElementHandler.verifyText(notifyError, ErrorMessage.INVALID_COMPANY_NAME);
    return this;
  }

  verifyErrorWithInvalidUsername(){
    ElementHandler.waitForElementDisplayed(notifyError);
    ElementHandler.verifyText(notifyError, ErrorMessage.INVALID_USERNAME);
    return this;
  }


  verifyErrorWithInvalidSercurityCode(){
    ElementHandler.waitForElementDisplayed(notifyError);
    ElementHandler.verifyText(notifyError, ErrorMessage.INVALID_SERCURITY_CODE);
    return this;
  }

  verifyPageAfterLogin(){
    ElementHandler.waitForElementDisplayed(mainContentPage);
    return this;
  }
}

export default new LoginPage()
