import { bindable, computedFrom, BindingSignaler, inject } from 'aurelia-framework';
var DispositionLoader = require('../../../../loader/memo-disposition-loader');
import { PurchasingService } from "../purchasing-service";

@inject(PurchasingService)
export class Item {

  constructor(purchasingService) {
    this.purchasingService = purchasingService;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    console.log(this.data, "item");

    this.itemOptions = { detailReadOnly: true }

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

    if (this.data.Disposition)
      this.disposition = this.data.Disposition

    this.dispositionLoaderQuery = {
      currencyCode: this.data.currency ? this.data.currency.Code : "",
      divisionId: this.data.division ? this.data.division.Id : 0,
      supplierIsImport: this.data.supplierIsImport
    }

    this.calculateTotalAmount();
  }

  detailColumns = [
    "No. Kas Bon", "Supplier", "Keterangan", "No. SPB", "No. BTU", "Valas", "Jumlah Beli (Rp)", "Valas", "Jumlah Bayar (Rp)"
  ];

  IncomeTaxByOptions = ["", "Supplier", "Dan Liris"];

  get dispositionLoader() {
    return DispositionLoader;
  }

  dispositionTextView = (disposition) => {

    return disposition.DocumentNo ? disposition.DocumentNo : disposition.Disposition.DocumentNo;

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
      this.calculateTotalAmount();
    } else {
      delete this.data.IsGetPPn;
      this.calculateTotalAmount();
    }
  }

  @bindable disposition;
  async dispositionChanged(newValue, oldValue) {
    if (newValue) {
      this.data.Disposition = newValue.Disposition;
      let dispoLoader = await this.purchasingService.getUnitPaymentOrder(this.data.Disposition.Id)
        .then((result) => {
          return result;
        });

      if (dispoLoader)
        this.data.Disposition.Details = this.data.Disposition.Details.map((detail) => {
          detail.UnitPaymentOrder = dispoLoader.UnitPaymentOrder;
          detail.Remark = dispoLoader.Remark;
          detail.UnitReceiptNotes = dispoLoader.UnitReceiptNotes;
          detail.PurchaseAmount = dispoLoader.PurchaseAmount;
          detail.PurchaseAmountCurrency = dispoLoader.PurchaseAmountCurrency;
          return detail;
        })
    } else {
      this.data.Details = [];
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
      if (this.data.IsGetPPn)
        vatAmount = this.data.Amount * 0.1;
      this.data.Total = Math.round((this.data.Amount - (this.data.Amount * (this.data.IncomeTax.rate / 100)) + vatAmount + Number.EPSILON) * 100) / 100;
    } else {
      let vatAmount = 0;
      if (this.data.IsGetPPn)
        vatAmount = this.data.Amount * 0.1;
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

  @bindable selectedAmount;
  selectedAmountChanged(newValue, oldValue) {
    if (newValue) {
      this.data.Amount = newValue;
      this.calculateTotalAmount();
    }
  }
}
