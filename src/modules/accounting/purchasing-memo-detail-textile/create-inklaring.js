import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  hasCancel = true;
  hasSave = true;
  isShowing = true;
  isShowingAmount = true;
  isCreate = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  activate(params) {
    this.bank = params.bank;
    this.status = params.status;
  }

  bind(params) {
    this.data = {};
    // this.data.Date = new Date();
    // this.data.Date.setHours(0, 0, 0, 0);
    this.error = {};
  }

  cancel(event) {
    this.data = {};
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  save(event) {
    this.data.IsInklaring = true;
    this.data.Type = 2;
    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create-inklaring",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
