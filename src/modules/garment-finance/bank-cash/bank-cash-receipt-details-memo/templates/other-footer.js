import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class OtherFooter {
    activate(context) {
        this.context = context;
    }

    get amountSum() {
        var qty = this.context.items
            .map((item) => item.data.Amount);
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get idrSum() {
        var qty = this.context.items
            .map((item) => item.data.Amount * item.data.Currency.Rate);
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

}
