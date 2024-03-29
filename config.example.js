
module.exports = {
  bonsai : {
    url : {
      signIn: 'https://app.hellobonsai.com/users/sign_in',
      logOut: 'https://app.hellobonsai.com/logout',
      timeEntries: 'https://app.hellobonsai.com/time_entries'
    },
    api : {
      timeEntries: 'https://app.hellobonsai.com/api/v1/time_entries?company=true&include_non_project=true',
      projects: 'https://app.hellobonsai.com/api/v1/projects',
      invoices: 'https://app.hellobonsai.com/api/v1/invoices'
    },
    auth : {
      username: 'user@bonsai.com',
      password: 'password'
    }
  },
  settings : {
    currency: 'USD',
    lastDayOfTheMonthlyBillingPeriod: 25
  }
};