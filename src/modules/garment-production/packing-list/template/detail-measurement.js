import { inject, bindable, computedFrom } from 'aurelia-framework'


export class measurement {

    constructor() {

    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
        };

    }

    get cmb() {
        if (this.data.length && this.data.width && this.data.height && this.data.cartonsQuantity)
            return (this.data.length * this.data.width * this.data.height * this.data.cartonsQuantity / 1000000).toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        else
            return "0";
    }
}