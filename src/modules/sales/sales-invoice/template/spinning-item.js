import { inject, bindable, BindingEngine } from "aurelia-framework";
import { SpinningDetail } from "./spinning-detail";
import { DataForm } from "./../data-form";

@inject(SpinningDetail, DataForm, BindingEngine)
export class SpinningItem {
  @bindable Price;
  @bindable QuantityItem;
  @bindable ItemUom;
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

  ItemUomChanged(newValue, oldValue) {
    if (newValue) {
      this.data.ItemUom = newValue;
      if (this.data.QuantityItem && this.data.ItemUom) {
        if (this.data.QuantityItem > 0) {
          if (this.data.ItemUom == "MTR") {
            this.ConvertValue = parseInt(this.QuantityItem * (10936 / 10000));
            this.ConvertUnit = "YARD";
          } else if (this.data.ItemUom == "YARD") {
            this.ConvertValue = parseInt(this.QuantityItem / (10936 / 10000));
            this.ConvertUnit = "MTR";
          } else {
            this.ConvertValue = 0;
            this.ConvertUnit = null;
          }
          this.data.ConvertValue = this.ConvertValue;
          this.data.ConvertUnit = this.ConvertUnit;
        } else {
          this.data.ConvertValue = 0;
          this.data.ConvertUnit = null;
        }
      }
    }
  }

  QuantityItemChanged(newValue, oldValue) {
    if (newValue) {
      this.data.QuantityItem = newValue;
      if (this.data.QuantityItem && this.data.ItemUom) {
        if (this.data.QuantityItem > 0) {
          if (this.data.ItemUom == "MTR") {
            this.ConvertValue = parseInt(this.QuantityItem * (10936 / 10000));
            this.ConvertUnit = "YARD";
          } else if (this.data.ItemUom == "YARD") {
            this.ConvertValue = parseInt(this.QuantityItem / (10936 / 10000));
            this.ConvertUnit = "MTR";
          } else {
            this.ConvertValue = 0;
            this.ConvertUnit = null;
          }
          this.data.ConvertValue = this.ConvertValue;
          this.data.ConvertUnit = this.ConvertUnit;
        } else {
          this.data.ConvertValue = 0;
          this.data.ConvertUnit = null;
        }

        if (this.PaymentType) {
          if (this.PaymentType == "MTR") {
            this.getAmount = this.QuantityItem * this.Price;
            this.data.Amount = this.getAmount;
          } else if (this.PaymentType == "YARD") {
            this.getAmount = this.ConvertValue * this.Price;
            this.data.Amount = this.getAmount;
          } else {
            this.getAmount = 0;
            this.data.Amount = this.getAmount;
          }
        }
      }
    }
  }

  PriceChanged(newValue, oldValue) {
    if (newValue) {
      this.data.Price = newValue;
      if (this.PaymentType) {
        if (this.PaymentType == "MTR") {
          this.getAmount = this.QuantityItem * this.Price;
          this.data.Amount = this.getAmount;
        } else if (this.PaymentType == "YARD") {
          this.getAmount = this.ConvertValue * this.Price;
          this.data.Amount = this.getAmount;
        } else {
          this.getAmount = 0;
          this.data.Amount = this.getAmount;
        }
      }
    }
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }
}
