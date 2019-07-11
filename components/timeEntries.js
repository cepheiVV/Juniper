const puppeteer = require('puppeteer');
const config = require('../config.js');
const _ = require('lodash')

const TimeEntries = {

  async getTimeEntries(browser, page) {
    await page.goto(config.bonsai.api.timeEntries, { waitUntil: 'networkidle2' });
    let timeSheet = await page.evaluate(() =>  {
        return JSON.parse(document.querySelector("body").innerText); 
    }); 
    return timeSheet.time_entries;
  },

  
  /**
   * income that will be billed
   * 
   * @param  {Object} timeSheet json
   * @param  {Bool} includeDrafted, when false; shows income that is not on an invoice yet
   * @return {number} rounded income
   */
  async sumUnbilledIncome(timeSheet, includeDrafted=true) {

    let unbilledAmount = 0;

    const unbilledTime = _.filter(timeSheet, (trackedTime) => {
      if (includeDrafted) {
        return trackedTime.status === 'unbilled' || trackedTime.invoice_status === 'drafted';  
      } else {
        return trackedTime.status === 'unbilled' || trackedTime.invoice_exists === false;
      }
      
    });

    for (var i = unbilledTime.length - 1; i >= 0; i--) {
      let item = unbilledTime[i];
      unbilledAmount += item.rate * (item.seconds / 60 / 60);
    }
    
    return Math.round(unbilledAmount);
  },

  /**
   * income that has been billed already
   * 
   * @param  {Object} timeSheet json
   * @param  {String} status
   * @return {number} rounded income
   */
  async sumPendingIncome(timeSheet) {

    let billedAmount = 0;

    const billedTime = _.filter(timeSheet, (trackedTime) => {
      return trackedTime.status === 'billed' && trackedTime.invoice_status === 'outstanding';
    });

    for (var i = billedTime.length - 1; i >= 0; i--) {
      let item = billedTime[i];
      billedAmount += item.rate * (item.seconds / 60 / 60);
    }
    
    return Math.round(billedAmount);
  }

}

module.exports = TimeEntries;
