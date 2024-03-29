const puppeteer = require("puppeteer");
const config = require("../config.js");

const Auth = {
  /**
   * log in
   * @return {object} puppeteer browser and page
   */
  async logIn() {
    const { username, password } = config.bonsai.auth;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page
      .goto(config.bonsai.url.signIn, { 
        waitUntil: "networkidle0"
      })
      .catch((e) => {
        console.log("Navigation failed: " + e.message);
        process.exit();
      });

    /**
     * // Test page markup
     * let bodyHTML = await page.evaluate(() => document.body.innerHTML);
     * console.log(bodyHTML);
     * process.exit();
     */

    await page
        .type('input[id="login-user-email"]', username)
        .catch((e) => {
          // debug: e.message
          console.log("Input field input[id=\"login-user-email\"] not found.");
          process.exit();
        });
    await page
        .type('input[id="login-user-password"]', password)
        .catch((e) => {
          // debug: e.message
          console.log("Input field input[id=\"login-user-password\"] not found.");
          process.exit();
        });
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[name="commit"]'),
    ]).catch(function (err) {
      console.log(err.message); // some coding error in handling happened
      process.exit();
    });

    return { browser, page };
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
  },
};

module.exports = Auth;
