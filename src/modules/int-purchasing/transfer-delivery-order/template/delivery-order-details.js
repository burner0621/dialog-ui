import { inject, BindingEngine } from 'aurelia-framework';


export class DeliveryOrderItem {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
}

  grades = ["", "A", "B", "C"];

  activate(context) {
    this.context = context;
    // console.log(this.context);
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;

  }

  productView = (product) => {
    return `${product.ProductCode}-${product.ProductName}`;
  }

}