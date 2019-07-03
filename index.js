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
  const unbilledAmount = await TimeEntries.sumIncome(timeSheet, 'unbilled');
  const billedAmount = await TimeEntries.sumIncome(timeSheet, 'billed');
  
  // show data
  await CliReport.report(
    unbilledAmount,
    billedAmount
  );

  // logout
  await Auth.logOut(browser);
  await CliReport.stop();
})();
