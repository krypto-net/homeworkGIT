const LOGIN_LOCATORS = require('../locator/LoginPage.locator');
const LocatorHelper = require('../locator/LocatorHelper');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(LOGIN_LOCATORS.url);
  }

  async usernameInput() {
    return this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.usernameInput));
  }

  async passwordInput() {
    return this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.passwordInput));
  }

  async loginButton() {
    return this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.loginButton));
  }

  async errorMessage() {
    return this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.errorMessage));
  }

  async enterUsername(username) {
    const element = await this.usernameInput();
    await element.clear();
    await element.sendKeys(username);
  }

  async enterPassword(password) {
    const element = await this.passwordInput();
    await element.clear();
    await element.sendKeys(password);
  }

  async clickLogin() {
    const element = await this.loginButton();
    await element.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorText() {
    const element = await this.errorMessage();
    return element.getText();
  }
}

module.exports = LoginPage;
