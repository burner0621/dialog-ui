import { bindable, computedFrom } from 'aurelia-framework';

var CurrencyLoader = require('../../../../loader/currency-loader');

export class Item {
    constructor() {
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        this.selectedCurrency = this.data.Currency;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedCurrency;
    selectedCurrencyChanged(newValue, oldValue) {
        this.data.Currency = newValue;
    }

    @computedFrom("data.Currency && data.PaymentAmount && data.Interest")
    get getTotal() {
        return this.data.Currency ? this.data.PaymentAmount * this.data.Currency.Rate + (this.data.PaymentAmount * this.data.Currency.Rate * this.data.Interest / 100) : 0;
    }
}
