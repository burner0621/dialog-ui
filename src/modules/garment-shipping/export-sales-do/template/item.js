import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

const ComodityLoader = require('../../../../loader/garment-comodities-loader');
const UomLoader = require('../../../../loader/uom-loader');

@inject(Service)
export class items {

    get comodityLoader() {
        return ComodityLoader;
    }

    
    comodityView = (comodity) => {
        return `${comodity.Code || comodity.code} - ${comodity.Name || comodity.name}`;
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {
        return uom.Unit || uom.unit;
    }

    
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
    }

}