import { inject, BindingEngine } from 'aurelia-framework';

var COALoader = require('../../../../loader/coa-loader');

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    get coaLoader() {
        return COALoader;
    }

    coaTextView = ((coa) => {
        return coa.Name ? coa.Code + " - " + coa.Name : coa.Code;
    })
}
