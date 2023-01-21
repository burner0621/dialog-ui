import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    customOptions = {
      label: {
        length: 2
      },
      control: {
        length: 4
      }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
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
