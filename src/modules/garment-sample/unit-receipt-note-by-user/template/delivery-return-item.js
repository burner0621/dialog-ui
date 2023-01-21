import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentDeliveryReturnItem {
    activate(context) {
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.data.Conversion=parseFloat(this.data.Conversion);
    }
}