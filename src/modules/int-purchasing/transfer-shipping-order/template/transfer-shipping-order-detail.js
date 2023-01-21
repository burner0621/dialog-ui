import { inject, BindingEngine, bindable } from 'aurelia-framework';
const UomLoader = require('../../../../loader/uom-loader');

@inject(BindingEngine)
export class TransferShippingOrderDetail {
    @bindable dataDeliveryQuantity;

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    gradeItems = ["", "A", "B", "C"];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        this.dataProduct = `${this.data.Product.code} - ${this.data.Product.name}`;
        this.dataDeliveryQuantity = this.data.DeliveryQuantity;
    }

    get uomLoader() {
        return UomLoader;
    }

    dataDeliveryQuantityChanged(newValue) {
        this.data.DeliveryQuantity = newValue;
        this.data.RemainingQuantity = newValue;
    }
}