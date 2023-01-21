import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {}
  }

  bind() {
    this.data = { items: [] };
    this.error = {};
    this.cancelCallback = this.cancel;
    this.saveCallback = this.save;
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  isValid() {
    let isValid = true;
    const errorList = [];
    const Items = [];

    this.data.MemoDetailGarmentPurchasingDetail.map(item => {
      let itemError = {};
      console.log('item', item);
      if (!item.BillsNo) {
        itemError.BillsNo = 'No. BP Besar tidak boleh kosong';
        isValid = false;
      }

      if (!item.PaymentBills) {
        itemError.PaymentBills = 'No. BP Kecil tidak boleh kosong';
        isValid = false;
      }

      if (!item.MemoAmount) {
        itemError.MemoAmount = 'Jumlah tidak boleh kosong';
        isValid = false;
      }

      if (!item.PaymentRate) {
        itemError.PaymentRate = 'Rate Bayar tidak boleh kosong';
        isValid = false;
      }

      if (item.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderId) {
        Items.push({
          RemarksDetail: `${item.MemoDetailGarmentPurchasingDetail.SupplierCode} - ${item.MemoDetailGarmentPurchasingDetail.SupplierName}`,
          GarmentDeliveryOrderId: item.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderId,
          GarmentDeliveryOrderNo: item.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderNo,
          PaymentRate: item.PaymentRate,
          PurchasingRate: item.MemoDetailGarmentPurchasingDetail.CurrencyRate,
          MemoAmount: item.MemoAmount,
          MemoIdrAmount: item.MemoAmount * item.MemoDetailGarmentPurchasingDetail.CurrencyRate,
          SupplierCode: item.MemoDetailGarmentPurchasingDetail.SupplierCode,
          SupplierName: item.MemoDetailGarmentPurchasingDetail.SupplierName,
        })
      }

      errorList.push(itemError);
    });

    return { isValid, Items, errorList }
  }

  save(event) {
    // let valid = this.isValid();
    // this.error = { MemoGarmentPurchasingDetails: valid.errorList };
    // let isValid = valid.isValid;
    // if (!this.data.Memo) {
    //   isValid = false;
    //   this.error = { MemoNo: 'Nomor Memo tidak boleh kosong', MemoGarmentPurchasingDetails: valid.errorList };
    // }
    // const Items = valid.Items;
    // const constructedData = {
    //   MemoId: this.data.Memo.Id || undefined,
    //   MemoDate: this.data.Memo.MemoDate,
    //   MemoNo: this.data.Memo.MemoNo,
    //   AccountingBookId: this.data.Memo.AccountingBook.Id,
    //   AccountingBookType: this.data.Memo.AccountingBook.Type,
    //   GarmentCurrenciesId: this.data.Memo.Currency.Id,
    //   GarmentCurrenciesCode: this.data.Memo.Currency.Code,
    //   GarmentCurrenciesRate: this.data.Memo.Currency.Rate,
    //   IsPosted: false,
    //   Remarks: this.data.remarks,
    //   MemoDetailGarmentPurchasingDetail: Items
    // };

    // console.log(this.data);

    if (this.data.MemoDetailGarmentPurchasingDispositions && this.data.MemoDetailGarmentPurchasingDispositions.length > 0) {
      for (var detail of this.data.MemoDetailGarmentPurchasingDispositions) {
        if (detail.Disposition && detail.Disposition.MemoDetails && detail.Disposition.MemoDetails.lngth > 0) {
          detail.Disposition.MemoDetails = detail.Disposition.MemoDetails.filter((element) => element.Select);
        }
      }
    }

    this.service.create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
      })
      .catch((e) => {
        this.error = e;
      });
  }
}