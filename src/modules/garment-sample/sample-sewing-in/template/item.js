import {bindable, computedFrom} from 'aurelia-framework'

export class Item {

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.contextOptions = context.context.options;
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 50/100)) * this.data.RemainingQuantity;
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }

      qtyChanged(e) {
        var qty=e.srcElement.value;
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 50/100)) * qty;
        
      }
}