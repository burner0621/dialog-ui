import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var ProductLoader = require('../../../../loader/product-purchasing-null-tags-loader');
var UomLoader = require('../../../../loader/uom-loader');

@containerless()
@inject(Service, BindingEngine)
export class InventoryDocumentItem {
  productFields = ["code", "name"];

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  async bind(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (!this.data.productId) {
      this.data.productId = 0;
    } else {
      if (!this.data.selectedProduct) {
        this.selectedProduct = await this.service.getProductById(this.data.productId, this.productFields);
        this.data.selectedProduct = this.selectedProduct;
      } else {
        this.selectedProduct = this.data.selectedProduct;

      }
    }
    if (!this.data.uomId) {
      this.data.uomId = 0;
    } else {
      if (!this.data.selectedUom) {
        this.selectedUom = await this.service.getUomById(this.data.uomId);
        this.data.selectedUom = this.selectedUom;
      } else {
        this.selectedUom = this.data.selectedUom;
      }
    }
    if(this.data.quantity)
      this.data.quantity=this.data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 4 });
  }

  @bindable selectedProduct;
  selectedProductChanged(newValue, oldValue) {
    if (this.selectedProduct && this.selectedProduct.Id) {
      if(!this.readOnly)
        this.selectedUom = this.selectedProduct.UOM;
      this.data.productId = this.selectedProduct.Id;
      this.data.productCode = this.selectedProduct.Code;
      this.data.productName = this.selectedProduct.Name;
    }
    else {
      this.data.productId = 0;
      this.data.productCode = "";
      this.data.productName = "";
    }
  }

  productView = (product) => {
    return `${product.Code} - ${product.Name}`;
  }

  get productLoader() {
    return ProductLoader;
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom.Id) {
      this.data.uomId = this.selectedUom.Id;
      this.data.uom = this.selectedUom.Unit;
    }
    else {
      this.data.uomId = 0;
      this.data.uom = "";
    }
  }

  uomView = (uom) => {
    return uom.Unit;
  }

  get uomLoader() {
    return UomLoader;
  }

  controlOptions = {
    control: {
      length: 10
    }
  };
}
