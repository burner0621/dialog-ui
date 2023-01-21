import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var moment = require('moment');
var ComodityLoader = require('../../../loader/garment-master-plan-comodity-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader')

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable error = {};

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 3
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.data.CreatedUtc) {
            this.data.CreatedUtc = new Date();
        }
        
    }

}