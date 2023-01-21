import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.id });
  }

  save(event) {
    if(typeof this.data.DateIm === 'object')
      this.data.DateIm.setHours(this.data.DateIm.getHours() - this.data.DateIm.getTimezoneOffset() / 60);

    this.service.update(this.data)
      .then(result => {
        this.cancel();
      })
      .catch(e => {
        this.error = e;
      })
  }
}
