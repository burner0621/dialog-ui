import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class ROGarmentSizeBreakdownFooter {
    activate(context) {
        this.context = context;
        this.colspan = this.context.options.readOnly === true ? 1 : 2;
    }

    get totalQuantity() {
        let totalQuantity = 0;
        this.context.items.forEach(item => {
            if (item.data && item.data.RO_Garment_SizeBreakdown_Details) {
                item.data.RO_Garment_SizeBreakdown_Details.forEach(sb => {
                    totalQuantity += Number(sb.Quantity);
                })
            }
        })
        return totalQuantity;
    }
}