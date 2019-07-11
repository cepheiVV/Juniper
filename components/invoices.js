const puppeteer = require('puppeteer');
const config = require('../config.js');
const _ = require('lodash')

const Invoices = {
    
    /**
     * scrape data
     * @param {Object} browser 
     * @param {Object} page 
     */
    async getInvoices(browser, page) {
        await page.goto(config.bonsai.api.invoices, { waitUntil: 'networkidle2' });
        let invoiceSheet = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText); 
        }); 
        const invoices = invoiceSheet.invoices;

        // if more than one page
        // fetch data from other pages
        const totalPages = invoiceSheet.total_pages;
        if (totalPages > 1) {
            let currentPage = 2;
            while (totalPages >= currentPage) {
                // fetch page n
                let targetPage = config.bonsai.api.invoices + '?page=' + currentPage;
                await page.goto(targetPage, { waitUntil: 'networkidle2' });
                let nextSheet = await page.evaluate(() =>  {
                    return JSON.parse(document.querySelector("body").innerText); 
                });

                // merge new invoices with previously fetched invoices
                for (let i = 0; i < nextSheet.invoices.length; i++) {
                    const invoice = nextSheet.invoices[i];
                    invoices.push(invoice);
                }

                // set next page 
                currentPage++;   
            }
        }

        return invoices;
    },

    /**
     * sum amount of invoices with given status
     * @param {Object} invoiceSheet 
     * @param {String} status 
     */
    async sum(invoiceSheet, status) {
        let amount = 0;

        const invoices = _.filter(invoiceSheet, (invoice) => {
            return invoice.invoice.status === status;
        });

        for (var i = invoices.length - 1; i >= 0; i--) {
            let item = invoices[i];
            amount += parseFloat(item.invoice.amount_due);
        }
        
        return Math.round(amount);
    }
}

module.exports = Invoices;
