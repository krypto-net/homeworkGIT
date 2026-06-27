const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo Automation Test', function () {

    it('Login standard_user', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin   = await driver.findElement(By.id('login-button'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

        let inventoryList = await driver.findElement(By.css('.inventory_list'));
        assert.strictEqual(await inventoryList.isDisplayed(), true);

        await driver.quit();
    });

    it('Urut produk A-Z', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin   = await driver.findElement(By.id('login-button'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        await driver.wait(
            until.elementLocated(By.css('.inventory_list')),
            10000
        );

        let sortDropdown = await driver.findElement(
            By.css('[data-test="product-sort-container"]')
        );

        await sortDropdown.click();
        let optionAZ = await driver.findElement(By.css('option[value="az"]'));
        await optionAZ.click();

        let firstProduct = await driver.findElement(By.css('.inventory_item_name'));
        let productName  = await firstProduct.getText();
        assert.strictEqual(productName, 'Sauce Labs Backpack');

        let activeFilter = await driver.findElement(By.css('.product_sort_container'));
        assert.strictEqual(await activeFilter.isDisplayed(), true);

        await driver.quit();
    });
});