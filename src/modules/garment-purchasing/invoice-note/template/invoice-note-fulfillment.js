import { bindable } from 'aurelia-framework'

export class DeliveryOrderItem {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.pricePerDealUnit=(this.data.pricePerDealUnit).toLocaleString('en-EN', { maximumFractionDigits: 4,minimumFractionDigits:4});
    this.doQuantity=parseFloat(this.data.doQuantity).toFixed(2).toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
  }

  get product() {
        return `${this.data.product.Code} - ${this.data.product.Name}`;
  }

  get totalPrice() {
    return Number((parseFloat(this.data.pricePerDealUnit) * parseFloat(this.data.doQuantity)).toFixed(2)).toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
  }
  
  controlOptions = {
    control: {
      length: 12
    }
  };
}