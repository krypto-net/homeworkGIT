const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');

const LoginPage = require('../page/LoginPage');
const ScreenshotPage = require('../page/ScreenshotPage');
const VisualRegressionHelper = require('../utilities/VisualRegressionHelper');

describe('Saucedemo - Login Tests', function () {
  this.timeout(60000);

  let driver;
  let loginPage;
  let screenshotAction;
  let visualRegression;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    loginPage = new LoginPage(driver);
    screenshotAction = new ScreenshotPage(driver);
    visualRegression = new VisualRegressionHelper();
  });

  beforeEach(async function () {
    await loginPage.open();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('Login dengan standard user', async function () {
    await loginPage.login('standard_user', 'secret_sauce');

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('inventory.html');

    await screenshotAction.takeFullScreenshot('current/login_success.png');
    const result = await visualRegression.compareImages('login_success.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk login_success.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });

  it('Login gagal (invalid username)', async function () {
    await loginPage.login('invalid_user', 'secret_sauce');

    const errorText = await loginPage.getErrorText();
    expect(errorText).to.include('Username and password do not match');

    await screenshotAction.takeFullScreenshot('current/invalid_username.png');
    const result = await visualRegression.compareImages('invalid_username.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk invalid_username.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });

  it('Login gagal (wrong password)', async function () {
    await loginPage.login('standard_user', 'wrong_password');

    const errorText = await loginPage.getErrorText();
    expect(errorText).to.include('Username and password do not match');

    await screenshotAction.takeFullScreenshot('current/wrong_password.png');
    const result = await visualRegression.compareImages('wrong_password.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk wrong_password.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });

  it('Login gagal (locked_out_user)', async function () {
    await loginPage.login('locked_out_user', 'secret_sauce');

    const errorText = await loginPage.getErrorText();
    expect(errorText).to.include('Sorry, this user has been locked out');

    await screenshotAction.takeFullScreenshot('current/locked_out_user.png');
    const result = await visualRegression.compareImages('locked_out_user.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk locked_out_user.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });
});
