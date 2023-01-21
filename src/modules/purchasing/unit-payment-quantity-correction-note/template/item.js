import {bindable} from 'aurelia-framework'
export class UnitPaymentQuantityCorrectionNoteItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.quantity = this.data.quantity || 0;
  }
    controlOptions = {
    control: {
      length: 12
    }
  };
  
  @bindable quantity
  quantityChanged(newValue,oldValue){
    this.data.quantity = newValue;
    this.data.priceTotal = this.data.pricePerUnit * newValue;
  }

  get product() {
    return `${this.data.product.code} - ${this.data.product.name}`;
  }
}
