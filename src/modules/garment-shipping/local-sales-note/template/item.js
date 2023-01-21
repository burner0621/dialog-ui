import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
const ProductLoader = require('../../../../loader/garment-leftover-warehouse-product-loader');
const UomLoader = require('../../../../loader/uom-loader');
import { Service } from '../service';

@inject(Service)
export class Item {
    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    get productLoader() {
        return ProductLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    get productFilter() {
        return {
            ProductTypeId: this.context.context.options.transactionTypeId
        };
    }

    productView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    uomView = (data) => {
        return `${data.Unit || data.unit || ""}`;
    }

    get total() {
        this.data.amount = this.data.quantity * this.data.price;

        return this.data.amount;
    }
}