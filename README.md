# Juniper Bonsai

A scraper to get some insights of your Bonsai account.

 - Displays the income that can be billed at the next billing day 
 - Displays the pending income that has been billed, but is not paid yet


## Setup
0. clone this repo
1. `cd` into the project directory
2. run `npm install`
3. copy `config.example.js` to `config.js`
4. set your Bonsai (app.hellobonsai.com) username and password in `config.js`
5. run `node index.js`


## Demo output

```
....................................
.     GETTING DATA FROM BONSAI     .
....................................
.                                  .
.             REPORT               .
.                                  .
. Invoice due          :  9344 USD
. Invoice drafted      :  7236 USD
. Not on invoice yet   :  431 USD
.                                  .
.                                  .
....................................
.      LOGGED OUT FROM BONSAI      .
....................................
```