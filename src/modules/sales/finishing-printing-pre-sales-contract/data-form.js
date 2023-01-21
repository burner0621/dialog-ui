import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from './service';

import UnitLoader from "../../../loader/unit-loader";
import BuyerLoader from "../../../loader/buyers-loader";
import ProcessTypeLoader from "../../../loader/process-type-loader";

@containerless()
@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable options = {};
    @bindable buyer;
    @bindable processType;
    @bindable unit;

    scTypes = ["JOB ORDER", "SAMPLE"];

    filterBuyerBrand = {};
    unitQuery = { "DivisionName.toUpper()": "DYEING & PRINTING" };
    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.data.Date = this.data.Date ? this.data.Date : new Date();

        if (this.data.Buyer) {
            this.buyer = this.data.Buyer;
        }

        if (this.data.Unit) {
            this.unit = this.data.Unit;
        }

        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

        this.options.isCreate = this.context.isCreate;
    }

    unitChanged(n, o) {
        if (this.unit && this.unit.Id) {
            this.data.Unit = this.unit;
        }
    }

    buyerChanged(newValue) {
        if (this.buyer && this.buyer.Id) {
            this.data.Buyer = this.buyer;
        }
    }

    processTypeChanged(newValue) {
        if (this.processType && this.processType.Id) {
            this.data.ProcessType = this.processType;
        }
    }


    unitView = (unit) => {
        return `${unit.Name}`
    }
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }
    processTypeView = (processType) => {
        return `${processType.Code} - ${processType.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }
    get buyerLoader() {
        return BuyerLoader;
    }
    get processTypeLoader() {
        return ProcessTypeLoader;
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 3,
        }
    }
}