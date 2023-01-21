import { inject, bindable, computedFrom } from 'aurelia-framework'

export class detail {
    @bindable product;

    activate(context) {
        
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    
}