import { bindable, computedFrom } from 'aurelia-framework';
const UnitPaymentOrderLoader = require('../../../../loader/spb-for-vb');
// const

export class NewItem {
  constructor() {
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;

    console.log(context);

    this.selectedUnitPaymentOrder = {
      no: this.data.no
    };

    this.loaderOptions = context.context.options;
    this.filter = {
      poExtIds: this.loaderOptions.selectedPOIds
    }
  }

  // changeCheckBox() {
  //   this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
  // }

  get unitPaymentOrderLoader() {
    return UnitPaymentOrderLoader;
  }

  @bindable selectedUnitPaymentOrder;
  selectedUnitPaymentOrderChanged(newValue, oldValue) {
    if (newValue) {
      this.data.UnitPaymentOrder = newValue;
      this.data.no = newValue.no;
      this.data.date = newValue.date;
      this.data.division = newValue.division.name;
      this.data.item = newValue.items;
      this.data.supplier = newValue.supplier;
      this.data.currency = newValue.currency;
    } else {
      delete this.data.UnitPaymentOrder;
      delete this.data.no
      delete this.data.date
      delete this.data.division
      delete this.data.item
      delete this.data.supplier
      delete this.data.currency
    }
  }
}
