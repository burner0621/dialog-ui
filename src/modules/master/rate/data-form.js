import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    customOptions = {
        label: {
            length: 5
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    get unitLoader() {
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
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
        if (this.data && this.data.Unit && !this.data.Unit.Id) {
            this.data.Unit = null;
        }
    }
} 
