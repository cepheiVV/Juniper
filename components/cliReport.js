const config = require('../config.js');

const CliReport = {
  
  async start() {
    console.log('................................');
    console.log('.   GETTING DATA FROM BONSAI   .');
    console.log('................................');
  },
  
  async report(unbilledAmount, unbilledAndNoInvoiceAmount, billedAmount) {
    const {currency} = config.settings;

    console.log('.                              .');
    console.log('.           REPORT             .');
    console.log('.                              .');
    console.log('. Invoice not created:', unbilledAndNoInvoiceAmount, currency);
    console.log('. Invoice not sent:   ', unbilledAmount, currency);
    console.log('. Invoice sent:       ', billedAmount, currency);
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