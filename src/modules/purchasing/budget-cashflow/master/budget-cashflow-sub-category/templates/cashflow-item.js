import { inject, BindingEngine, bindable } from 'aurelia-framework';

const CategoryLoader = require('../../../loader/category-loader');

@inject(BindingEngine)
export class CashflowItem {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    // @bindable category;
    // categoryChanged(newVal, oldVal) {
    //     if (newVal) {
    //         this.data.CategoryId = newVal.Id;
    //     } else {
    //         this.data.CategoryId = 0;
    //     }
    // }
}
