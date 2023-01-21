import { inject, bindable, computedFrom } from 'aurelia-framework'
import { event } from 'jquery';
import { Service, CoreService } from "./service";
// let GarmentCurrencyLoader = require('../../../loader/garment-currency-loader-camelcase');
// let GarmentCurrencyLoader = require('../../../loader/garment-currency-loader-by-code-after-date');
let AccountingBookLoader = require('../../../loader/accounting-book-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable title;
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    detailColumns = [
        { header: "No Akun", value: "COA.No" },
        { header: "Nama Perkiraan", value: "COA.Name" },
        { header: "Debit", value: "DebitNominal" },
        { header: "Kredit", value: "CreditNominal" }
    ];

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        // if(this.data.AccountingBook)
        //     this.selectedGarmentCurrency = this.data.AccountingBook;
        // if(this.data.Currency)
        //     this.selectedGarmentCurrency = this.data.Currency;
    }

    // @bindable selectedGarmentCurrency;
    // selectedGarmentCurrencyChanged(newValue) {
    //     if (newValue)
    //         this.data.Currency = newValue;
    // }

    get currencyLoader() {
        return (keyword) => {
            // return fetch("https://api.github.com/users").then(response => response.json())
            let args = {
                keyword: keyword,
                filter: JSON.stringify({date: this.data.MemoDate}),
                size: 10
            }
            
            return this.coreService.search(args).then(res => {
                return res;
            });
          }
        // return GarmentCurrencyLoader;
    }

    // currencyView = (currency) => {
    //     return `${currency.Code}`
    // }

    // @bindable selectedAccountingBook;
    // selectedAccountingBookChanged(newValue) {
    //     if (newValue)
    //         this.data.AccountingBook = newValue;
    // }

    get accountingBookLoader() {
        return AccountingBookLoader;
    }

    accountingBookView = (accountingBook) => {
        return `${accountingBook.Code} - ${accountingBook.Type}`
    }

    get addDetails() {
        return (event) => {
            var newDetail=   {
                COA: {},
                DebitNominal: 0,
                CreditNominal: 0
            };
            this.data.MemoGarmentPurchasingDetails.push(newDetail);
        };
    }

} 
