import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
  // @bindable data;
  // @bindable error;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {

  }

  list() {
    this.router.navigateToRoute('list');
  }

  cancelCallback(event) {
    this.list();
  }



  saveCallback(event) {
    this.service.create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      })
  }
}


