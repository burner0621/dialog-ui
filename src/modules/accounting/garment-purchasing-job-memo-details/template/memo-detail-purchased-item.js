import { inject, bindable } from 'aurelia-framework'
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

  constructor() { }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = this.options.readOnly;
    if (!this.data.MemoDetailGarmentPurchasingDetail) {
      this.data.MemoDetailGarmentPurchasingDetail = {};
    }
    if (this.data.MemoDetailGarmentPurchasingDetail) {
      this.dataDebt = this.data.MemoDetailGarmentPurchasingDetail;
    }

    if (!this.readOnly && this.data.MemoAmount <= 0) {
      this.data.MemoAmount = this.data.PurchaseAmount;
    }
  }

  dataDebtChanged(newValue) {
    this.data.MemoDetailGarmentPurchasingDetail = newValue;
    if (this.data.MemoDetailGarmentPurchasingDetail) {
      this.data.GarmentDeliveryOrderNo = this.data.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderNo || {};
      this.data.BillsNo = this.data.MemoDetailGarmentPurchasingDetail.BillsNo || {};
      this.data.PaymentBills = this.data.MemoDetailGarmentPurchasingDetail.PaymentBills || {};
      this.data.MemoDetailGarmentPurchasingDetail.RemarksDetail = `${this.data.MemoDetailGarmentPurchasingDetail.SupplierCode} - ${this.data.MemoDetailGarmentPurchasingDetail.SupplierName}`
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}