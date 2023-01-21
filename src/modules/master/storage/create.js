import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
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

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  saveCallback(event) {
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
