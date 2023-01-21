import { inject, bindable, BindingEngine } from "aurelia-framework";
import { DyeingPrintingDetail } from "./dyeing-printing-detail";
import { DataForm } from "./../data-form";

@inject(DyeingPrintingDetail, DataForm, BindingEngine)
export class DyeingPrintingItem {
  @bindable QuantityItem;
  @bindable Price;

  constructor(dyeingPrintingDetail, dataForm, bindingEngine) {
    this.dyeingPrintingDetail = dyeingPrintingDetail;
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
    this.ConvertValue = this.data.ConvertValue;
    this.Price = this.data.Price;
    this.getAmount = this.data.Amount;
  }

  PriceChanged(newValue, oldValue) {
    if (this.PaymentType == "MTR") {
      this.getAmount = this.QuantityItem * this.Price;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    } else if (this.PaymentType == "YARD") {
      this.getAmount = this.ConvertValue * this.Price;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    } else {
      this.getAmount = 0;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    }
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }
}
