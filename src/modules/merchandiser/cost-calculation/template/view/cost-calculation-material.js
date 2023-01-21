import { inject, bindable, computedFrom } from 'aurelia-framework';
import numeral from 'numeral';
const defaultNumberFormat = "0,0.000";

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
        this.data.Category.FullName = this.data.Category.SubCategory ? this.data.Category.Name + " - " + this.data.Category.SubCategory : this.data.Category.Name;
        this.data.QuantityInUnit = numeral(this.data.Quantity).format(defaultNumberFormat) + " " + this.data.UOMQuantity.Unit;
        this.data.PricePerUnit = this.data.Price.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2})+ " / " + this.data.UOMPrice.Unit;
        this.data.Total = this.data.Total.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
        this.data.Product.Construction=this.data.Product.Const;
        
    }
}
