import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from '../service';
const SizeLoader = require('../../../../loader/size-loader');

@inject(Service)
export class Detail {
    @bindable selectedSize;

    get sizeLoader() {
        return SizeLoader;
    }

    constructor(service) {
        this.service = service;
    }

    // @computedFrom("data.Quantity", "data.Conversion")
    // get convertedQuantity() {
    //     return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data.Size){
            this.selectedSize = this.data.Size;
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = this.context.context.options.isEdit;
        if(this.isEdit){
            this.readOnly=false;
        }

    }

    async selectedSizeChanged(newValue) {
        if (newValue) {
            this.data.Size = newValue;
        } else {

            this.data.CuttingOutUom = [];
        }
    }

    sizeView = (size) => {
        return `${size.Size}`;
    }

}