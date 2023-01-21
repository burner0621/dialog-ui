import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class BrokenCausesFooter {
    activate(context) {
        this.context = context;
    }

    get totalBrokenAccumulation() {
        let totalBrokenAccumulation = 0;
        for (let item of this.context.items) {
            if (item.data) {
                totalBrokenAccumulation += item.data.TotalBroken ? Number(item.data.TotalBroken) : 0;
            }
        }
        return totalBrokenAccumulation;
    }
}