import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    this.hasView = true;
    var locale = 'id-ID';
    this.readOnlyBCDL = true;
    var moment = require('moment');
    moment.locale(locale);
    var id = params.id;
    this.data = await this.service.getById(id);

    // has been created of unit receipt note ?
    var isCreated = {};
    var unitReceiptNotesDeliveryOrderNo = []; // get DeliveryOrderNo

    for (var data of this.data.items) {
      unitReceiptNotesDeliveryOrderNo.push(data.deliveryOrder.Id);
    }
    isCreated = await this.service.isCreatedOfUnitReceiptNotes(unitReceiptNotesDeliveryOrderNo); // search

    let poMasterDistributionRequestFilter = {};
    poMasterDistributionRequestFilter[unitReceiptNotesDeliveryOrderNo.map(id => `DOId==${id}`).join(" || ")] = true;
    const poMasterDistributionRequest = await this.service.searchPOMasterDistributions({
      filter: JSON.stringify(poMasterDistributionRequestFilter),
      // select: JSON.stringify({ Id: 1, DOId: 1 }),
      size: 0
    });

    // if (isCreated > 0) {
    //   this.hasEdit = false;
    //   this.hasDelete = false;
    // }

    this.data.deliveryOrders = this.data.items;


    for (var a of this.data.items) {
      a["selected"] = true;
      a["isView"] = false;
      a["doNo"] = a.deliveryOrder.doNo;
      a["doDate"] = a.deliveryOrder.doDate;
      a["arrivalDate"] = a.deliveryOrder.arrivalDate;
      a["quantity"] = a.quantity;
      a["price"] = a.deliveryOrder.totalAmount;

      var isReceipt;

      for (var item of a.deliveryOrder.items) {
        for (var detail of item.fulfillments) {
          if (detail.receiptQuantity > 0) {
            isReceipt = true;
            break;
          }
        }
      }
      if (a.deliveryOrder.isInvoice === true || isReceipt === true) {
        this.hasEdit = false;
        this.hasDelete = false;
      }

      if (poMasterDistributionRequest && poMasterDistributionRequest.statusCode == 200 && poMasterDistributionRequest.info.total > 0) {
        this.hasDelete = false;
      }

    }

    this.data.beacukaiDate = moment(this.data.beacukaiDate).format("YYYY-MM-DD");
    this.data.validationDate = moment(this.data.validationDate).format("YYYY-MM-DD");
    this.data.arrivalDate = moment(this.data.arrivalDate).format("YYYY-MM-DD");
  }

  cancel(event) {
    var r = confirm("Apakah anda yakin akan Keluar?")
    if ( r == true) {
      this.router.navigateToRoute('list');
    }
    
  }

  edit(event) {
    var r = confirm("Apakah anda yakin akan mengubah data ini?")
    if (r == true) {
      this.router.navigateToRoute('edit', { id: this.data._id });
    }
  }

  delete(event) {
    var r = confirm("Apakah anda yakin akan menghapus data ini?")
    if (r == true) {
      this.service.delete(this.data)
      .then(result => {
        this.cancel();
      });
    }
  }
}