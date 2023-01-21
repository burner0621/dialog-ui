import { bindable, computedFrom, BindingSignaler, inject } from 'aurelia-framework';
var IncomeTaxLoader = require('../../../../loader/income-tax-loader');
var VatTaxLoader = require('../../../../loader/vat-tax-loader');

// @inject(BindingSignaler)
export class Item {

  constructor() {
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;

    // this.selectedIncomeTax = this.data.IncomeTax || null;
    this.selectedIncomeTaxBy = this.data.IncomeTaxBy || "";
    this.selectedAmount = this.data.Amount || 0;
    this.selectedPPh = this.data.IsGetPPh;
    this.selectedVat = this.data.IsGetPPn;


    if (this.data.IncomeTax) {
      this.selectedIncomeTax = this.data.IncomeTax;
      this.selectedIncomeTax.name = this.data.IncomeTax.Name;
      this.selectedIncomeTax.rate = this.data.IncomeTax.Rate ? this.data.IncomeTax.Rate : 0;
      this.data.IncomeTax.rate = this.data.IncomeTax.Rate ? this.data.IncomeTax.Rate : 0;
    }

    if (this.data.VatTax) {
      this.selectedVatTax = this.data.VatTax;
      this.selectedVatTax.Rate = this.data.VatTax.Rate ? this.data.VatTax.Rate :"";
      this.data.VatTax.Rate = this.data.VatTax.Rate ? this.data.VatTax.Rate : "";
    }
   

    this.calculateTotalAmount();
  }

  IncomeTaxByOptions = ["", "Supplier", "Dan Liris"];

  get incomeTaxLoader() {
    return IncomeTaxLoader;
  }

  incomeTaxView = (incomeTax) => {

    return incomeTax.name ? `${incomeTax.name} - ${incomeTax.rate}` : "";

  }

  vatTaxView = (vatTax) => {
    return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
  }

  get vatTaxLoader() {
    return VatTaxLoader;
}

  @bindable selectedIncomeTaxBy;
  selectedIncomeTaxByChanged(newValue) {
    if (newValue) {
      this.data.IncomeTaxBy = newValue
      this.calculateTotalAmount();
    }
    else {
      delete this.data.IncomeTaxBy;
      this.calculateTotalAmount();
    }
  }

  @bindable selectedVat;
  selectedVatChanged(newValue) {
    if (newValue) {
      this.data.IsGetPPn = newValue
      // this.calculateTotalAmount();
    } else {
      this.selectedVatTax = null;
      delete this.data.IsGetPPn;
      // this.calculateTotalAmount();
    }
  }

  @bindable selectedPPh;
  selectedPPhChanged(newValue) {
    if (newValue) {
      this.data.IsGetPPh = newValue;
      this.calculateTotalAmount();
    } else {
      this.selectedIncomeTax = null;
      this.selectedIncomeTaxBy = "";
      delete this.data.IsGetPPh;
      this.calculateTotalAmount();
    }
  }


  calculateTotalAmount() {
    if (this.data.IncomeTaxBy == "Supplier" && this.data.IsGetPPh && this.data.IncomeTax) {
      let vatAmount = 0;
      if (this.data.IsGetPPn && this.data.VatTax)
        vatAmount = this.data.Amount * (this.data.VatTax.Rate / 100);
      this.data.Total = Math.round((this.data.Amount - (this.data.Amount * (this.data.IncomeTax.rate / 100)) + vatAmount + Number.EPSILON) * 100) / 100;
    } else {
      let vatAmount = 0;
      if (this.data.IsGetPPn && this.data.VatTax)
        vatAmount = this.data.Amount * (this.data.VatTax.Rate / 100);
      this.data.Total = Math.round((this.data.Amount + vatAmount + Number.EPSILON) * 100) / 100
      
    }
  }

  @bindable selectedIncomeTax;
  selectedIncomeTaxChanged(newValue, oldValue) {
    if (newValue) {
      this.data.IncomeTax = newValue;
      this.data.IncomeTax.Rate = this.data.IncomeTax.rate;
      this.data.IncomeTax.Name = this.data.IncomeTax.name;
      this.calculateTotalAmount();

    } else {
      this.data.IncomeTax = {};
      this.data.IncomeTax.Rate = 0;
      this.data.IncomeTax.Name = "";
      this.calculateTotalAmount();
    }
  }

  @bindable selectedVatTax;
  selectedVatTaxChanged(newValue, oldValue) {
    if (newValue) {
      this.data.VatTax = newValue;
      this.data.VatTax.Rate = this.data.VatTax.Rate;
      this.calculateTotalAmount();
    }else{
      this.data.VatTax = {};
      this.data.VatTax.Rate = "";
      this.calculateTotalAmount();
  }
}

  @bindable selectedAmount;
  selectedAmountChanged(newValue, oldValue) {
    if (newValue) {
      this.data.Amount = newValue;
      this.calculateTotalAmount();
    }
  }
}
