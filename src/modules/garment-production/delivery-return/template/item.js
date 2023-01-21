import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentDeliveryReturnItem {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
console.log(this.options)
        if (this.options.returnType === "RETUR") {
            this.readOnly = true;
            this.options.isEdit=false;
        }
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }
}