import { bindable, computedFrom, BindingSignaler, inject } from 'aurelia-framework';
var UnitPaymentOrderLoader = require('../../../../loader/memo-unit-payment-order-loader');

// @inject(BindingSignaler)
export class Item {

  constructor() {
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.detailReadOnly = this.options.detailReadOnly;

    if (this.data.UnitReceiptNotes && this.data.UnitReceiptNotes.length > 0) {
      this.data.UnitReceiptNoteNo = this.data.UnitReceiptNotes.map((urn) => urn.UnitReceiptNoteNo).join('\n')
    }
    console.log(this.data, "detail")
    this.upoLoaderQuery = {
      currencyCode: this.data.currency ? this.data.currency.Code : "",
      divisionId: this.data.division ? this.data.division.Id : 0,
      supplierIsImport: this.data.supplierIsImport
    }

    if (this.data.UnitPaymentOrder)
      this.unitPaymentOrder = Object.assign({}, this.data.UnitPaymentOrder);

  }

  detailColumns = [
    "No. Kas Bon", "Supplier", "Keterangan", "No. SPB", "No. BTU", "Valas", "Jumlah Beli (Rp)", "Valas", "Jumlah Bayar (Rp)"
  ];

  get unitPaymentOrderLoader() {
    return UnitPaymentOrderLoader;
  }

  @bindable unitPaymentOrder;
  unitPaymentOrderChanged(newVal, oldVal) {
    if (newVal) {
      this.data.Expenditure = Object.assign({}, newVal.Expenditure);
      this.data.Supplier = Object.assign({}, newVal.Supplier);
      this.data.PurchaseAmount = newVal.PurchaseAmount;
      this.data.PurchaseAmountCurrency = newVal.PurchaseAmountCurrency;
      this.data.UnitReceiptNotes = newVal.UnitReceiptNotes;
      this.data.UnitPaymentOrder = Object.assign({}, newVal.UnitPaymentOrder)
      this.data.Remark = newVal.Remark;
      // this.data = Object.assign({}, newVal);
      if (this.data.UnitReceiptNotes && this.data.UnitReceiptNotes.length > 0) {
        this.data.UnitReceiptNoteNo = this.data.UnitReceiptNotes.map((urn) => urn.UnitReceiptNoteNo).join('\n')
      }
    }
  }

  unitPaymentOrderView = (unitPaymentOrder) => {

    return unitPaymentOrder && unitPaymentOrder.UnitPaymentOrderNo ? `${unitPaymentOrder.UnitPaymentOrderNo}` : `${unitPaymentOrder.UnitPaymentOrder ? unitPaymentOrder.UnitPaymentOrder.UnitPaymentOrderNo : ''}`;

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
