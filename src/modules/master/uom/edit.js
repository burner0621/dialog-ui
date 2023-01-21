import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(data) {
      this.router.navigateToRoute('view', { id: this.data.Id });
    }
  


  saveCallback(event) {
    this.service.update(this.data)
      .then(result => {
        this.router.navigateToRoute('view', { id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      })
  }
}
