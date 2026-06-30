const fs = require('fs');
const path = require('path');
const { By } = require('selenium-webdriver');

class ScreenshotPage {
  constructor(driver) {
    this.driver = driver;
    this.screenshotDir = path.join(__dirname, '..', 'screenshots');
  }

  async takeFullScreenshot(relativePath) {
    const screenshotPath = path.join(this.screenshotDir, relativePath);
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    const screenshot = await this.driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return screenshotPath;
  }

  async takeElementScreenshot(selector, relativePath) {
    const screenshotPath = path.join(this.screenshotDir, relativePath);
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    const element = await this.driver.findElement(By.css(selector));
    const screenshot = await element.takeScreenshot(true);
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return screenshotPath;
  }
}

module.exports = ScreenshotPage;
