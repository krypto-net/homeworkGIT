const INVENTORY_LOCATORS = require('../locator/InventoryPage.locator');
const LocatorHelper = require('../locator/LocatorHelper');

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  }

  async pageTitle() {
    return this.driver.findElement(LocatorHelper.getBy(INVENTORY_LOCATORS.selectors.pageTitle));
  }

  async getTitleText() {
    const element = await this.pageTitle();
    return element.getText();
  }

  async addBackpackToCart() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(INVENTORY_LOCATORS.selectors.addToCartBackpack)
    );
    await element.click();
  }

  async cartBadge() {
    return this.driver.findElement(LocatorHelper.getBy(INVENTORY_LOCATORS.selectors.cartBadge));
  }

  async getCartBadgeCount() {
    const element = await this.cartBadge();
    return element.getText();
  }

  async goToCart() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(INVENTORY_LOCATORS.selectors.cartLink)
    );
    await element.click();
  }
}

module.exports = InventoryPage;
