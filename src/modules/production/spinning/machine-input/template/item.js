import { inject, bindable, computedFrom } from 'aurelia-framework'

export class Item {

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.Input = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.context.context.options.isEdit;
    }


    controlOptions = {
        control: {
            length: 12
        }
    };


}