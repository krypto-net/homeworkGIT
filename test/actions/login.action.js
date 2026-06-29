import loginPage from '../pageobjects/login.page'

export class LoginAction {
  async enterUsername(username) {
    const fields = await $$(loginPage.usernameInput)
    if (fields.length >= 1) {
      await fields[0].setValue(username)
    }
  }

  async enterPassword(password) {
    const fields = await $$(loginPage.usernameInput)
    if (fields.length >= 2) {
      await fields[1].setValue(password)
    }
  }

  async tapLogin() {
    const btn = await $(loginPage.loginButton)
    await btn.click()
  }

  async login(username, password) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.tapLogin()
  }

  async isOnLoginPage() {
    const btn = await $(loginPage.loginButton)
    return btn.isDisplayed()
  }

  async waitForProducts() {
    const title = await $(loginPage.productsTitle)
    await title.waitForDisplayed({ timeout: 10000 })
    return title.isDisplayed()
  }
}

export default new LoginAction()