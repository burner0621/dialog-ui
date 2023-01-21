import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentROAcceptanceCC {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
    }
}