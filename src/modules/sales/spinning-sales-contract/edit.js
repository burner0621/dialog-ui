import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;
  hasCreate = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  async activate(params) {
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);
    var id = params.id;
    this.data = await this.service.getById(id);
    console.log(this.data);
    if(this.data.VatTax){
      this.data.useVat = true;
    }

    // if (this.data.VatTax) {
    //   this.selectedVatTax = this.data.VatTax;
    // }

  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  save(event) {
    this.data.DeliverySchedule = moment(this.data.DeliverySchedule).format("YYYY-MM-DD");
    this.service.update(this.data)
      .then(result => {
        this.cancel();
      })
      .catch(e => {
        this.error = e;
      })
  }
}

