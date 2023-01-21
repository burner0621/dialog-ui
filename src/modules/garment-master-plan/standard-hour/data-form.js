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
    @bindable selectedBuyer;
    @bindable selectedComodity;

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

        if (!this.data.SMVDate) {
            this.data.SMVDate = new Date();
        }
        
    }

    selectedBuyerChanged(newValue) {
        var selectedBuyer = newValue;
        if (selectedBuyer) {
            this.data.Buyer = selectedBuyer;
            this.data.BuyerId = selectedBuyer.Id
            this.data.BuyerName = selectedBuyer.Name;
            this.data.BuyerCode = selectedBuyer.Code;
        }else{
            this.data.Buyer = null;
        }
    }

    selectedComodityChanged(newValue) {
        var selectedComodity = newValue;
        if (selectedComodity) {
            this.data.Comodity = selectedComodity;
            this.data.ComodityId = selectedComodity.Id 
            this.data.ComodityCode = selectedComodity.Code
            this.data.ComodityName = selectedComodity.Name
        }else{
            this.data.Comodity = null;
        }
    }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get comodityQuery(){
        var result = { "_CreatedBy" : "dev217" }
        return result;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
}