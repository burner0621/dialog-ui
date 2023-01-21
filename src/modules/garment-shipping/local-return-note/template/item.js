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

    productView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    uomView = (data) => {
        return `${data.Unit || data.unit}`;
    }

    get total() {
        this.data.amount = this.data.returnQuantity * this.data.salesNoteItem.price;

        return this.data.amount;
    }

    changeCheckBox() {
        this.context.context.options.isCheckedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.isChecked, true);
    }
}