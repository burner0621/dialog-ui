import {bindable} from 'aurelia-framework'

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.options = context.options;
  }

  get category() {
    return `${this.data.Category.Name}`;
  }

  get product() {
    return `${this.data.Product.Code} - ${this.data.Product.Name}`;
  }

  get uom() {
    return `${this.data.Uom.Unit}`;
  }

  get quantity() {
    return this.data.Quantity.toFixed(2);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}