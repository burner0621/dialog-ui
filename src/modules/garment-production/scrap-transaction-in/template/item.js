import {bindable, computedFrom} from 'aurelia-framework'

export class Item {
    activate(context) {
        this.data = context.data;
        // this.options = context.context.options;
         this.error = context.error;
        // this.contextOptions = context.context.options;
        // this.readOnly = this.options.readOnly;
        // this.data.UomUnit = "KG";
        // this.data.Quantity = this.data.Quantity;

    }
}