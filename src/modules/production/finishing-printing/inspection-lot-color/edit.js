import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  fabricQcReadOnly = true;

  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.fabricQc = this.data;
    this.fabricQc.code = this.data.fabricQualityControlCode;
    this.data.fabricQc = this.data;
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  save(event) {
    this.data.fabricQc = null;
    this.service.update(this.data)
      .then(result => {
        this.cancel();
      })
      .catch(e => {
        this.error = e;
      })
  }
}