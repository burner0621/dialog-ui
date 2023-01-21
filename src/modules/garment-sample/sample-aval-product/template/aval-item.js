import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentAvalProductItem {
    activate(context) {
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        if(this.options.isView){
            this.data.ProductCode = this.data.Product.Code;
            this.data.UomUnit = this.data.Uom.Unit;
        }
    }
}