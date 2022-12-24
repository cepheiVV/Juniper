const Auth = require('./components/auth.js');
const CliReport = require('./components/cliReport.js');
const Invoices = require('./components/invoices.js');
const TimeEntries = require('./components/timeEntries.js');

(async () => {

  // authenticate
  await CliReport.start();
  const auth = await Auth.logIn();
  const {page, browser} = auth;

  // get data
  const invoiceSheet = await Invoices.getInvoices(browser, page);
  const timeSheet = await TimeEntries.getTimeEntries(browser, page);

  // get all incoices that are due
  const dueInvoices = await Invoices.sum(invoiceSheet, 'outstanding');

  // get all invoices that will be sent
  const draftedInvoices = await Invoices.sum(invoiceSheet, 'drafted');

  // get time from timetrackers that is not on any invoice yet
  const unbilledAndNoInvoiceAmount = await TimeEntries.sumUnbilledIncome(timeSheet, false);
  
  // show data
  await CliReport.report(
    dueInvoices,
    draftedInvoices,
    unbilledAndNoInvoiceAmount
  );

  // logout
  await Auth.logOut(browser);
  await CliReport.stop();
})();
