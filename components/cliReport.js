const config = require('../config.js');

const CliReport = {
  
  async start() {
    console.log('................................');
    console.log('.   GETTING DATA FROM BONSAI   .');
    console.log('................................');
  },
  
  async report(unbilledAmount, billedAmount) {
    const {currency} = config.settings;

    console.log('.                              .');
    console.log('.           REPORT             .');
    console.log('.                              .');
    console.log('. Unbilled income: ', unbilledAmount, currency);
    console.log('. Pending income:  ', billedAmount, currency);
    console.log('.                              .');
    console.log('.                              .');

    return true;
  },

  async stop() {
    console.log('................................');
    console.log('.    LOGGED OUT FROM BONSAI    .');
    console.log('................................');
  }
}

module.exports = CliReport;