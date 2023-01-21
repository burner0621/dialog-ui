import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.getById(id);
    this.data.MemoNo = await this.service.getMemoById(this.data.MemoId);
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  isValid() {
    let isValid = true;
    const errorList = [];
    const Items = [];

    this.data.Items.map(item => {
      let itemError = {};

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

      if (!item.RemarksDetail) {
        itemError.RemarksDetail = 'Keterangan tidak boleh kosong';
        isValid = false;
      }
      item.MemoIdrAmount = item.MemoAmount * item.PurchasingRate;
      Items.push(item);
      errorList.push(itemError);
    });

    return { isValid, Items, errorList }
  }

  saveCallback(event) {

    if (this.data.MemoDetailGarmentPurchasingDispositions && this.data.MemoDetailGarmentPurchasingDispositions.length > 0) {
      for (var detail of this.data.MemoDetailGarmentPurchasingDispositions) {
        if (detail.Disposition && detail.Disposition.MemoDetails && detail.Disposition.MemoDetails.lngth > 0) {
          detail.Disposition.MemoDetails = detail.Disposition.MemoDetails.filter((element) => element.Select);
        }
      }
    }
    
    this.service.update(this.data)
      .then((result) => {
        alert("Data berhasil diupdate");
        this.router.navigateToRoute('view', { id: this.data.Id });
      })
      .catch((e) => {
        this.error = e;
      })
  }
}
