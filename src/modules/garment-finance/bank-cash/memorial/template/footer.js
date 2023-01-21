import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
    activate(context) {
        this.context = context;
    }

    get debitSum() {
        var qty = this.context.items
            .map((item) => item.data.Debit);
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get creditSum() {
        var qty = this.context.items
            .map((item) => item.data.Credit);
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

}
