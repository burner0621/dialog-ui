import { inject, bindable, BindingEngine, computedFrom } from 'aurelia-framework';

@inject(BindingEngine)
export class ROGarmentSizeBreakdownDetail {
    controlOptions = {
        control: {
            length: 12
        }
    };
    
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.columns = this.context.context.columns;
        this.options = this.context.options;
        this.readOnly = this.options.readOnly;
        this.error = this.context.error;
    }
}