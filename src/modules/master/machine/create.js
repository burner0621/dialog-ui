import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  activate(params) {

  }

  bind(){
    this.data = { machineEvents:[] };
    this.error = {};
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    this.service.create(this.data)
        .then(result => {
          this.router.navigateToRoute('list');
        })
        .catch(e => {
          this.error = e;
        })
  }  
}

