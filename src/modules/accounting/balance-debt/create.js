import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
//import { ServiceLocal } from './service-local';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
//@inject(Router, ServiceLocal)
export class Create {
  hasCancel = true;
  hasSave = true;
  // hasView = false;
  // hasCreate = true;
  // hasEdit = false;

  // constructor(router, service) {
  //   this.router = router;
  //   this.service = service;
  // }

  constructor(router, service) {
    this.router = router;
    this.service = service;
    //this.serviceLocal = serviceLocal;
    this.data = {};
  }
  activate(params) {

  }
  bind() {
    //this.data = { items: [] };
    this.error = {};
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
    // return activationStrategy.invokeLifecycle;
  }

  save(event) {
    if (this.data.expectedDeliveryDate == "undefined") {
      this.data.expectedDeliveryDate == "";
    }
    //this.service.create(this.data)
    this.service.create(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });


      })
      .catch(e => {
        this.error = e;
      })
  }
}
