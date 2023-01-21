import { inject, bindable, computedFrom } from 'aurelia-framework'
export class ProductionOrderItem {
    @bindable product;

    // isAval = false;
    // remarks = [];
    packingItems = [];
    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.data.IsSave = true;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };


}