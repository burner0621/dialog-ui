import { inject, BindingEngine } from 'aurelia-framework';
const SupplierLoader = require('../../../../../loader/supplier-loader');

@inject(BindingEngine)
export class MaterialRequestNoteDetail {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        if (this.options.isTest) {
            this.data.IsDisposition = false;
        }
        else {
            this.bindingEngine
                .propertyObserver(this.data, "ReceivedLength")
                .subscribe(this.receivedLengthChanged);
        }
    }

    receivedLengthChanged = (newValue, oldValue) => {
        /*
        let items = this.context.context.items;
        let sameProductionOrderItems = items.filter(p => p.data.ProductionOrder.orderNo === this.data.ProductionOrder.orderNo);

        let totalReceivedLength = sameProductionOrderItems.reduce((a, b) => {
            return a + b.data.ReceivedLength;
        }, 0);

        let dispositionRule = Number(((this.data.MaterialRequestNoteItemLength * 0.005) + this.data.MaterialRequestNoteItemLength).toFixed(2));
        let isDisposition = totalReceivedLength > dispositionRule ? true : false;

        for (let item of sameProductionOrderItems) {
            item.data.IsDisposition = isDisposition;
        }
        */
       
        /*
        // let dispositionRule = Number(((this.data.MaterialRequestNoteItemLength * 0.005) + this.data.MaterialRequestNoteItemLength).toFixed(2));
        // let isDisposition = this.data.ReceivedLength > dispositionRule ? true : false;
        // this.data.IsDisposition = isDisposition;
        */

        let dispositionRule = Number((1.005 * this.data.MaterialRequestNoteItemLength).toFixed(2));
        let isDisposition = this.data.ReceivedLength + this.data.DistributedLength > dispositionRule ? true : false;
        this.data.IsDisposition = isDisposition;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
}