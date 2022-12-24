const config = require("../config.js");

const CliReport = {
  async start() {
    console.log("....................................");
    console.log(".     GETTING DATA FROM BONSAI     .");
    console.log("....................................");
  },

  async report(dueInvoices, draftedInvoices, unbilledAndNoInvoiceAmount) {
    const { currency } = config.settings;

    console.log(".                                  .");
    console.log(".             REPORT               .");
    console.log(".                                  .");
    console.log(". Invoice due          : ", dueInvoices, currency);
    console.log(". Invoice drafted      : ", draftedInvoices, currency);
    console.log(
      ". Not on invoice yet   : ",
      unbilledAndNoInvoiceAmount,
      currency
    );
    console.log(
      ". Total income         : ",
      draftedInvoices + unbilledAndNoInvoiceAmount,
      currency
    );

    console.log(".                                  .");
    console.log(".                                  .");

    return true;
  },

  async stop() {
    console.log("....................................");
    console.log(".      LOGGED OUT FROM BONSAI      .");
    console.log("....................................");
  }
};

module.exports = CliReport;
