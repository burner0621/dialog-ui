import { inject, BindingEngine } from "aurelia-framework";

var COALoader = require("../../../../loader/coa-loader");

@inject(BindingEngine)
export class Item {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.vbRequestDocumentAmount =
      context.context.options.vbRequestDocumentAmount;
    this.vbType = this.options.vbType;
    this.vatAmount =
      this.data.UseVat && this.data.BLAWBNumber !== null
        ? this.data.PPnAmount
        : this.data.UseVat && this.data.BLAWBNumber == null
        ? this.data.Amount * (parseFloat(this.data.VatRate)/100)
        : 0;
    this.incomeTaxAmount =
      this.data.UseIncomeTax && this.data.BLAWBNumber !== null
        ? this.data.PPhAmount
        : this.data.UseIncomeTax && this.data.BLAWBNumber == null
        ? this.data.Amount * (this.data.IncomeTaxRate / 100)
        : 0;
  }

  get coaLoader() {
    return COALoader;
  }

  get total() {
    // console.log(this);
    // var result = this.data.Amount;
    // if (this.data.UseVat)
    //     result += result * 0.1
    // return result;

    if (this.data.IncomeTaxBy == "Supplier" && this.data.UseIncomeTax) {
      let vatAmount = 0;
      // if (this.data.UseVat) vatAmount = this.data.Amount * 0.1;
      vatAmount =
        this.data.UseVat && this.data.BLAWBNumber !== null
          ? this.data.PPnAmount
          : this.data.UseVat && this.data.BLAWBNumber == null
          ? this.data.Amount * (parseFloat(this.data.VatRate)/100)
          : 0;
      return this.data.BLAWBNumber !== null
        ? Math.round(
            (this.data.Amount -
              this.data.PPhAmount +
              vatAmount +
              Number.EPSILON) *
              100
          ) / 100
        : Math.round(
            (this.data.Amount -
              this.data.Amount * (this.data.IncomeTaxRate / 100) +
              vatAmount +
              Number.EPSILON) *
              100
          ) / 100;
    } else {
      let vatAmount = 0;
      //   if (this.data.UseVat) vatAmount = this.data.Amount * 0.1;
      vatAmount =
        this.data.UseVat && this.data.BLAWBNumber !== null
          ? this.data.PPnAmount
          : this.data.UseVat && !this.data.BLAWBNumber == null
          ? this.data.Amount * (parseFloat(this.data.VatRate)/100)
          : 0;
      return (
        Math.round((this.data.Amount + vatAmount + Number.EPSILON) * 100) / 100
      );

     
    }
  }
}
