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
        this.data.ProductionOrderDate = new Date(this.data.ProductionOrderDate).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');
    }

    controlOptions = {
        control: {
            length: 12
        }
    };


}