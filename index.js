const Auth = require('./components/auth.js');
const TimeEntries = require('./components/timeEntries.js');
const CliReport = require('./components/cliReport.js');

(async () => {

  // authenticate
  await CliReport.start();
  const auth = await Auth.logIn();
  const {page, browser} = auth;

  // get data  
  const timeSheet = await TimeEntries.getTimeEntries(browser, page);
  const unbilledAndNoInvoiceAmount = await TimeEntries.sumUnbilledIncome(timeSheet, false);
  const unbilledAmount = await TimeEntries.sumUnbilledIncome(timeSheet);
  const billedAmount = await TimeEntries.sumPendingIncome(timeSheet);
  
  // show data
  await CliReport.report(
    unbilledAmount,
    unbilledAndNoInvoiceAmount,
    billedAmount
  );

  // logout
  await Auth.logOut(browser);
  await CliReport.stop();
})();
