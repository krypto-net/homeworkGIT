const { By } = require('selenium-webdriver');
class LocatorHelper {
  static getBy(locator) {
    switch (locator.type) {
      case 'id':
        return By.id(locator.value);
      case 'css':
        return By.css(locator.value);
      case 'xpath':
        return By.xpath(locator.value);
      case 'name':
        return By.name(locator.value);
      case 'className':
        return By.className(locator.value);
      case 'linkText':
        return By.linkText(locator.value);
      default:
        throw new Error(`Unsupported locator type: ${locator.type}`);
    }
  }
}

module.exports = LocatorHelper;
