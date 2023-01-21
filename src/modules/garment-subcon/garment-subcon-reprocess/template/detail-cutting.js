import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from '../service';

const SizeLoader = require('../../../../loader/size-loader');

@inject(Service)
export class DetailCutting {
    @bindable selectedSize;

    get sizeLoader() {
        return SizeLoader;
    }

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.selectedSize = this.data.Size;

        this.readOnly = context.context.options.readOnly;
    }

    
}