import {bindable} from 'aurelia-framework'

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.options = context.options;
    this.error = context.error;

    if (this.options.readOnly) {
      this.data.QuantityString = (this.data.Quantity || 0).toFixed(2);
    }
  }

  get category() {
    return `${this.data.category.name}`;
  }

  get product() {
    return `${this.data.Product.Code} - ${this.data.Product.Name}`;
  }

  get uom() {
    return `${this.data.Uom.Unit}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}