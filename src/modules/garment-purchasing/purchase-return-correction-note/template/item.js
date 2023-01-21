import {bindable, computedFrom} from 'aurelia-framework'

export class PurchaseQuantityCorrectionItem {
    activate(context) {
        this.data = context.data;
        this.options = context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        this.quantitiesReadonly = this.options.readOnly;
        this.isFirst = false;
        if(this.data.Quantities === 0){
            this.quantitiesReadonly = true;
        }
        if(!this.error){
            this.error = "";
        }
        this.data.PricePerDealUnitAfter = this.data.PricePerDealUnitAfter;
        if(this.readOnly){
            this.data.Quantity=this.data.Quantity*(-1);
        }
    }
    
    @computedFrom("data.Quantity")
    get priceTotal() {
            if(this.isFirst == true){
                this.data.PriceTotalAfter = parseFloat((this.data.Quantity * this.data.PricePerDealUnitAfter).toFixed(2));
            }
            else
            {
                this.isFirst = true;
            }
        if(this.readOnly){
            this.data.PriceTotalAfter =this.data.PriceTotalAfter *(-1);
        }
            
        return this.data.PriceTotalAfter;
    }

    set priceTotal(value) {
        this.data.PriceTotalAfter = value;
        if(this.readOnly){
            this.data.PriceTotalAfter =this.data.PriceTotalAfter *(-1);
        }
        return this.data.PriceTotalAfter;
    }
}