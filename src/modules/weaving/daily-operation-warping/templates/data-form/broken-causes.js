import numeral from 'numeral';
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
numeral.defaultFormat("0,0.00");

export class BrokenCauses {

    constructor() {
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    bind() {

    }
}