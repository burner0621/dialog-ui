import {bindable, computedFrom} from 'aurelia-framework'

export class Item {

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.contextOptions = context.context.options;
        this.data.IsSave=true;
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 50/100)) * this.data.RemainingQuantity;
    }

}