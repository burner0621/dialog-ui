import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

@inject(Service, BindingEngine, BindingSignaler)
export class NewShipmentItem {

    packingReceiptOptions = {};
    packingReceiptItemsColumns = ["Macam Barang", "Design", "Satuan", "Kuantiti Satuan", "Panjang Satuan", "Panjang Total", "Berat Satuan", "Berat Total"]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        // console.log(this.data);
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;
    }

    removeItems() {
        this.bind();
    }

}