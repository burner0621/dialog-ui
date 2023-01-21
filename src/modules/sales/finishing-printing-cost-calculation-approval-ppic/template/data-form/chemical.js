import numeral from 'numeral';
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
numeral.defaultFormat("0,0.00");

export class Chemical {
    @bindable priceTotal;
    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor() {
    }


    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        console.log(this.options);
        this.readOnly = this.options.readOnly || false;
        this.priceTotal = this.data.Chemical.Price * this.data.ChemicalQuantity;
    }

    bind() {

    }

    // get priceTotal() {
    //     return this.data.Chemical.Price * this.data.Quantity;
    // }

}