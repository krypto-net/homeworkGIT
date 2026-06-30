const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');

const LoginPage = require('../page/LoginPage');
const InventoryPage = require('../page/InventoryPage');
const CartPage = require('../page/CartPage');
const CheckoutPage = require('../page/CheckoutPage');
const ScreenshotPage = require('../page/ScreenshotPage');
const VisualRegressionHelper = require('../utilities/VisualRegressionHelper');

describe('Add to Cart & Checkout Tests', function () {
  this.timeout(60000);

  let driver;
  let loginPage, inventoryPage, cartPage, checkoutPage;
  let screenshotAction, visualRegression;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    screenshotAction = new ScreenshotPage(driver);
    visualRegression = new VisualRegressionHelper();

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('Berhasil menambahkan item ke cart (add to cart)', async function () {
    await inventoryPage.addBackpackToCart();

    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).to.equal('1');

    await screenshotAction.takeFullScreenshot('current/add_to_cart.png');
    const result = await visualRegression.compareImages('add_to_cart.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk add_to_cart.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });

  it('Berhasil menyelesaikan proses checkout', async function () {
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    const headerText = await checkoutPage.getCompleteHeaderText();
    expect(headerText).to.include('Thank you for your order');

    await screenshotAction.takeFullScreenshot('current/checkout_complete.png');
    const result = await visualRegression.compareImages('checkout_complete.png');
    if (!result.hasBaseline) {
      console.log('Baseline dibuat untuk checkout_complete.png');
    } else {
      expect(result.match, `Visual diff: ${result.matchPercentage}%`).to.be.true;
    }
  });
});
