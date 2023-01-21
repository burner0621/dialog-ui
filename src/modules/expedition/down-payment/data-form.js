import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var BankLoader = require('../../../loader/account-banks-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var BuyerLoader = require('../../../loader/buyers-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedCurrency;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    ListCategory = ["", "Omzet","Uang Muka", "Pindah Buku","Lain-lain"];

    constructor(service, bindingEngine) {  
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        
        this.data.Bank = this.context.bank || this.data.Bank;
        this.selectedCurrency = this.data.Currency;
    }

    get bankLoader() {
        return BankLoader;
    }

    bankView = (bank) => {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get currencyLoader() {
      return CurrencyLoader;
  }

  selectedCurrencyChanged(newValue, oldValue) {
    this.data.Currency = newValue;
  }

    buyerView = (buyer) => {
        return `${buyer.Code} / ${buyer.Name}`
    }

}
