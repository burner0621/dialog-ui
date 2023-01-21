import { computedFrom } from 'aurelia-framework';
import numeral from 'numeral';

export class Item {

    @computedFrom("data.Quantity", "data.BudgetPrice", "data.PriceConversion")
    get total() {
        if (this.data.PriceConversion > 0) {
            let total = this.data.Quantity * this.data.BudgetPrice / this.data.PriceConversion;
            return numeral(total).format("0,000.00");
        } else {
            return 0;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    changeCheckBox() {
        this.context.headerContext.checkedAll = this.context.context.items.reduce((accItem, currItem) => accItem && currItem.IsSave, true);
        this.error = null;
    }
}