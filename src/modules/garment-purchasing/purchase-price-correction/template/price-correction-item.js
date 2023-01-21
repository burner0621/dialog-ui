import {bindable, computedFrom} from 'aurelia-framework'

export class PriceCorrectionItem {
    activate(context) {
        this.data = context.data;
        this.options = context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        this.pricePerUnitReadOnly = this.contextOptions.pricePerUnitReadOnly;
        this.pricePerUnitFirst = this.contextOptions.pricePerUnitFirst;
        this.correction = this.contextOptions.correction;
    }

    @computedFrom("data.PricePerDealUnitAfter")
    get priceTotal() {
        if(!this.pricePerUnitReadOnly) {
            if(this.correction) {
                if(!this.pricePerUnitFirst){
                    this.data.PriceTotalAfter = parseFloat((this.data.Quantity * this.data.PricePerDealUnitAfter).toFixed(2));
                }
                else{
                    this.pricePerUnitFirst = false;
                }
            }
            else
                this.data.PriceTotalAfter = parseFloat((this.data.Quantity * this.data.PricePerDealUnitAfter).toFixed(2));
        }
        
        return this.data.PriceTotalAfter.toFixed(2);
    }

    set priceTotal(value) {
        this.data.PriceTotalAfter = value;
        this.data.PricePerDealUnitAfter = parseFloat((this.data.PriceTotalAfter / this.data.Quantity).toFixed(2));
        return this.data.PriceTotalAfter;
    }
}
