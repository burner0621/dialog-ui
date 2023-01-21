import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import numeral from 'numeral';

export class CostCalculationMaterialFooter {
    activate(context) {
        this.context = context;
        this.colspan = 9;
    }

    get totalMaterial() {
        let totalMaterial = 0;
        for (let item of this.context.items) {
            if (item.data) {
                totalMaterial += numeral(item.data.Total).value();
            }
        }
        return totalMaterial;
    }
}