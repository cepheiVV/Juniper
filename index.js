const Auth = require('./components/auth.js');
 
(async () => {

  // authenticate
  await Auth.logIn();  

})();