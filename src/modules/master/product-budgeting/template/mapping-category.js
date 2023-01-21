import { inject, BindingEngine } from 'aurelia-framework';

var CategoryDivisionLoader = require('../../../../loader/category-division-loader');

@inject(BindingEngine)
export class MappingCategory {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    get categoryDivisionLoader() {
        return CategoryDivisionLoader;
    }

    textView = (data) => {
        return `${data.name} - ${data.divisionName}`;
    }
}
