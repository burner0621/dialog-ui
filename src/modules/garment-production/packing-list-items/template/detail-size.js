import { inject, bindable, computedFrom } from 'aurelia-framework'
const SizeLoader = require('../../../../loader/size-loader');

export class Detail {
    constructor() {
        
    }
    get sizeLoader() {
        return SizeLoader;
    }
    sizeView = (size) => {
        var sizeName= size.Size || size.size;
        return `${sizeName}`
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
            isEdit:this.isEdit,
        };
    }

}