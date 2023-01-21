import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const CurrencyLoader = require('../../../loader/currency-loader');

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    customOptions = {
      label: {
        length: 4,
        align: "left"
      },
      control: {
        length: 6
      }
    }

    custom2Options = {
      label: {
        length: 7,
        align: "left"
      }
    }

    customAddressOptions = {
      label: {
        length: 4,
        align: "left"
      },
      control: {
        length: 7
      }
    }

    divisionOptions = ['T','G'];

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    currencyView = (currency) => {
        return `${currency.Code}`;
    }

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.data && this.data.currency && !this.data.currency.Id) {
            this.data.currency = null;
        }
    }
} 
