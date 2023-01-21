import { inject, BindingEngine, bindable } from 'aurelia-framework';

var COALoader = require('../../../../loader/coa-loader');

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.selectedCOA = this.data.COA || null;

        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    get coaLoader() {
        return COALoader;
    }

    @bindable selectedCOA;
    selectedCOAChanged(newValue, oldValue) {
        if (newValue) {
            this.data.COA = newValue;
            this.data.COAId = newValue.Id;
        } else {
            this.data.COA = undefined;
            this.data.COAId = 0;
        }
    }
}
