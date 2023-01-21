import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
  hasCancel = true;
  hasSave = true;

  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  created(owner, self) {
    this.data = {}
  }

  cancel(event) {
    this.__goToList();
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  save(event) {
    if (typeof this.data.DateIm === 'object')
      this.data.DateIm.setHours(this.data.DateIm.getHours() - this.data.DateIm.getTimezoneOffset() / 60);
    this.data.IsUsed = false;

    this.service.create(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
      })
      .catch(error => {
        this.error = error;
      });
  }

  __goToList() {
    this.router.navigateToRoute('list');
  }
}
