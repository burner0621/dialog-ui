import { bindable, computedFrom, BindingSignaler, inject } from 'aurelia-framework';

const UnitLoader = require('../../../../loader/unit-loader');

// @inject(BindingSignaler)
export class Unit {

    constructor() {
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.data.IsSelected=true;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }
  
}
