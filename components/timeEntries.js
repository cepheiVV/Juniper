const puppeteer = require('puppeteer');
const config = require('../config.js');
const _ = require('lodash')

const TimeEntries = {

  async getTimeEntries(browser, page) {
    await page.goto(config.bonsai.api.timeEntries, { waitUntil: 'networkidle2' });
    let timeSheet = await page.evaluate(() =>  {
        return JSON.parse(document.querySelector("body").innerText); 
    }); 
    return timeSheet.time_entries
  },

  /**
   * gets the tracked time
   * and calculates the income that is pending so far
   * 
   * @param  {Object} timeSheet json
   * @param  {String} status
   * @return {number} rounded income
   */
  async sumIncome(timeSheet, status) {

    let unbilledAmount = 0;

    const unbilledTime = _.filter(timeSheet, (trackedTime) => {
      return trackedTime.status === status;
    });

    for (var i = unbilledTime.length - 1; i >= 0; i--) {
      let item = unbilledTime[i];
      unbilledAmount += item.rate * (item.seconds / 60 / 60);
    }
    
    return Math.round(unbilledAmount);
  }

}

module.exports = TimeEntries;
