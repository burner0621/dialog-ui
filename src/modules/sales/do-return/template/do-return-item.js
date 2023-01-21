import { bindable } from "aurelia-framework";

var UomLoader = require("../../../../loader/uom-loader");

export class DoReturnItem {
  @bindable Total;
  @bindable Price;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;

    this.Total = this.data.Total;
    this.Price = this.data.Price;
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;

    if (this.data.Uom) {
      this.selectedUom = {
        Id: this.data.Uom.Id,
        Unit: this.data.Uom.Unit,
      };
    }
  }

  TotalChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Total = this.Total;
  }

  PriceChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom.Id) {
      this.data.Uom = {};
      this.data.Uom.Id = this.selectedUom.Id;
      this.data.Uom.Unit = this.selectedUom.Unit;
    } else {
      this.data.Uom.Id = null;
      this.data.Uom.Unit = null;
    }
  }

  get uomLoader() {
    return UomLoader;
  }
}
