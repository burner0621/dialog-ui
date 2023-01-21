import { inject, bindable, BindingEngine } from "aurelia-framework";
import { SpinningDetail } from "./spinning-detail";
import { DataForm } from "./../data-form";

@inject(SpinningDetail, DataForm, BindingEngine)
export class SpinningItem {
  @bindable QuantityItem;
  @bindable Price;
  @bindable ConvertValue;
  @bindable ConvertUnit;

  constructor(spinningWeavingDetail, dataForm, bindingEngine) {
    this.spinningWeavingDetail = spinningWeavingDetail;
    this.dataForm = dataForm;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;
    this.PaymentType = context.context.options.PaymentType;
    this.QuantityItem = this.data.QuantityItem;
    this.ItemUom = this.data.ItemUom;
    this.ConvertValue = this.data.ConvertValue;
    this.ConvertUnit = this.data.ConvertUnit;
    this.Price = this.data.Price;
    this.getAmount = this.data.Amount;
  }

  packingUomOptions = [
    "",
    "PCS",
    "ROLL",
    "BALL",
    "PT",
  ];

  itemUomOptions = [
    "",
    "MTR",
    "YARD",
  ];

  QuantityItemChanged(newValue, oldValue) {
    this.getAmount = this.QuantityItem * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
    this.data.QuantityItem = this.QuantityItem;
  }

  PriceChanged(newValue, oldValue) {
    this.getAmount = this.QuantityItem * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
    this.data.QuantityItem = this.QuantityItem;
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }
}
