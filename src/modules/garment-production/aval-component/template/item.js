import { computedFrom } from "aurelia-framework";

export class Item {
    activate(context) {
        this.context = context;
        
        this.data = context.data;
        this.error = context.error;

        this.options = this.context.context.options;

        if (this.options.type !== 'CUTTING') {
            this.readOnly = true;
        }
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 25/100)) * this.data.Quantity;
    }

    changeCheckBox() {
        this.context.headerContext.checkedAll = this.context.context.items.reduce((accItem, currItem) => accItem && currItem.IsSave, true);
    }

    qtyChanged(e) {
        var qty=parseFloat(e.srcElement.value);
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 25/100)) * qty;
        
      }
}