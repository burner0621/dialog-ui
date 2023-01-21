import { inject, bindable} from 'aurelia-framework'
import { Service } from '../service';

var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');
var GarmentDebtLoaderBillsNo = require('../../../../loader/garment-debt-loader-bills-no');
var GarmentDebtLoaderPaymentBills = require('../../../../loader/garment-debt-loader-payment-bills');

@inject(Service)
export class MemoDetailPurchasedItem {
  @bindable dataDebt;

  get garmenDebtLoader() {
    return GarmentDebtLoader;
  }

  get garmentDebtLoaderBillsNo() {
    return GarmentDebtLoaderBillsNo;
  }

  get garmentDebtLoaderPaymentBills() {
    return GarmentDebtLoaderPaymentBills;
  }
  
  constructor() {
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    if (!this.data) {
      this.data.MemoDetailGarmentPurchasingDetail = {};
    }
    if (this.data) {
      this.dataDebt = this.data;
    }
  }

  dataDebtChanged(newValue) {
    if (!this.data.Id) {
      this.data.Id = 0;
    }
    this.data.GarmentDeliveryOrderId = newValue.GarmentDeliveryOrderId;
    this.data.GarmentDeliveryOrderNo = newValue.GarmentDeliveryOrderNo;
    this.data.InternalNoteNo = newValue.InternalNoteNo;
    this.data.BillsNo = newValue.BillsNo;
    this.data.PaymentBills = newValue.PaymentBills;
    this.data.SupplierCode = newValue.SupplierCode;
    this.data.CurrencyCode = newValue.CurrencyCode;
    this.data.PurchasingRate = newValue.CurrencyRate;
    this.data.SaldoAkhir = newValue.DPPAmount + newValue.VATAmount - newValue.IncomeTaxAmount;
    this.data.MemoAmount = 0;
    this.data.RemarksDetail = `${newValue.SupplierCode} - ${newValue.SupplierName}`
  }

  get getAmountIdr() {
    return (this.data.MemoAmount * this.data.PurchasingRate) || 0;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}