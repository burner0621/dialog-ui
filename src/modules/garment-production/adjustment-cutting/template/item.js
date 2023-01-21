import { computedFrom } from "aurelia-framework";

export class Item {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isEdit = this.context.isEdit;
        this.showOrigin = this.context.isEdit;
    }

    @computedFrom("data.ActualQuantity")
    get dataFC() {
        if(this.data.ActualQuantity){
            this.data.ActualFC=parseFloat((this.data.ActualQuantity/this.data.CuttingInQuantity).toFixed(2));

        }
        else{
            this.data.ActualFC=0;
        }
        this.data.Remaining = this.data.Quantity-this.data.ActualQuantity;
        return this.data.ActualFC;
    }
}