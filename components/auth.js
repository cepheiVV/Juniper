const puppeteer = require('puppeteer');
const config = require('../config.js');

const Auth = {

  /**
   * log in
   * @return {object} puppeteer browser and page
   */
  async logIn() {
    const {username, password} = config.bonsai.auth;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(config.bonsai.url.signIn, { waitUntil: 'networkidle2' });

    await page.type('input[id="login-user-email"]', username);
    await page.type('input[id="login-user-password"]', password);
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[name="commit"]')
    ]);
    
    return {browser, page};
  },

  /**
   * logOut
   * closing the browser will terminate the 
   * session and bonsai will be loged out
   * 
   * @param  {[type]} browser
   * @return {bool} true
   */
  async logOut(browser, page) {
    await browser.close();
  }

}

module.exports = Auth;