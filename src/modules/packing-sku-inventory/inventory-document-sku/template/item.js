import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var ProductLoader = require('../../packing-sku-loaders/product-sku-loader');

@containerless()
@inject(Service, BindingEngine)
export class Item {

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    console.log(context);
    this.error = context.error;
    this.options = context.options;

    this.selectedProductSKU = this.data.Product || this.selectedProductSKU;
  }

  bind(context) {


    // if(this.data.quantity)
    //   this.data.quantity=this.data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 4 });
  }

  @bindable selectedProductSKU;
  selectedProductSKUChanged(newValue, oldValue) {
    if (newValue) {
      this.data.ProductSKUId = newValue.id;
      this.data.UOMId = newValue.uomId;
      this.data.Product = newValue;
    } else {
      this.data.ProductSKUId = 0;
      this.data.UOMId = 0;
      this.data.Product = undefined;
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  // @bindable selectedUom;
  // selectedUomChanged(newValue, oldValue) {
  //   if (this.selectedUom && this.selectedUom.Id) {
  //     this.data.uomId = this.selectedUom.Id;
  //     this.data.uom = this.selectedUom.Unit;
  //   }
  //   else {
  //     this.data.uomId = 0;
  //     this.data.uom = "";
  //   }
  // }

  // uomView = (uom) => {
  //   return uom.Unit;
  // }

  // get uomLoader() {
  //   return UomLoader;
  // }

  controlOptions = {
    control: {
      length: 10
    }
  };
}
