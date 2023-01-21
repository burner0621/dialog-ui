import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-purchasing-null-tags-loader');

export class PurchaseRequestItem {
  @bindable dataProduct;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.productId) {
      this.data.productId = {};
    }
    if (this.data.product) {
      this.dataProduct = this.data.product;
    }
    if(this.data.quantity){
      this.data.quantity=this.data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }

  }

  get productLoader() {
    return ProductLoader;
  }

  dataProductChanged(newValue) {
    this.data.product = newValue;
    if (this.data.product) {
      this.data.productId = this.data.product.Id || {};
      this.data.product._id = this.data.productId;
      this.data.product.uom = {
        _id: this.data.product.UOM.Id,
        unit: this.data.product.UOM.Unit
      };
      delete this.data.product.UOM._id;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}