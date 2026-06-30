const CHECKOUT_LOCATORS = require('../locator/CheckoutPage.locator');
const LocatorHelper = require('../locator/LocatorHelper');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  async fillInfo(firstName, lastName, postalCode) {
    const first = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.firstNameInput)
    );
    await first.sendKeys(firstName);

    const last = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.lastNameInput)
    );
    await last.sendKeys(lastName);

    const postal = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.postalCodeInput)
    );
    await postal.sendKeys(postalCode);
  }

  async clickContinue() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.continueButton)
    );
    await element.click();
  }

  async clickFinish() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.finishButton)
    );
    await element.click();
  }

  async getCompleteHeaderText() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(CHECKOUT_LOCATORS.selectors.completeHeader)
    );
    return element.getText();
  }
}

module.exports = CheckoutPage;
