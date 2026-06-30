const CART_LOCATORS = require('../locator/CartPage.locator');
const LocatorHelper = require('../locator/LocatorHelper');

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async cartList() {
    return this.driver.findElement(LocatorHelper.getBy(CART_LOCATORS.selectors.cartList));
  }

  async clickCheckout() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(CART_LOCATORS.selectors.checkoutButton)
    );
    await element.click();
  }
}

module.exports = CartPage;
