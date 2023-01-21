import { inject, bindable, computedFrom } from 'aurelia-framework';
import numeral from 'numeral';
const defaultNumberFormat = "0,0.00";

export class CostCalculationMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    async activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.options = this.context.options;
        this.readOnly = true;
        if (this.data.Chemicals.length > 0) {
            this.data.Chemical = this.data.Chemicals.reduce((previousValue, currentValue) => {
                var res = previousValue + (currentValue.Chemical.Price * currentValue.ChemicalQuantity)

                return res;
            }, 0);
        } else {
            this.data.Chemical = 0;
        }
        this.data.Utility = this.data.Machine.Electric + this.data.Machine.Steam + this.data.Machine.Water + this.data.Machine.Solar + this.data.Machine.LPG;
        this.data.Total = this.data.Chemical + this.data.Utility + this.data.Depretiation;
    }
}
