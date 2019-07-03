const puppeteer = require('puppeteer');
const config = require('../config.js');

const Auth = {

  /**
   * check if loged in
   * @return {Boolean} [description]
   */
  async _isLogedIn(index0) {
    const {username, password} = config.bonsai.auth;
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(config.bonsai.url.signIn, { waitUntil: 'networkidle2' });

    await page.evaluate((username, password) => {
      document.getElementById('login-user-email').value = username;
      document.getElementById('login-user-password').value = password;
      document.querySelector('input[name="commit"]').click(); 
    }, username, password);
    
    //await browser.close();
  },

  /**
   * log in
   * @return {[type]}          [description]
   */
  async logIn() {
    const isLogedIn = await Auth._isLogedIn();
    console.log('will login');
  }

}

module.exports = Auth;