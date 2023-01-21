import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.service
      .create(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch(e => {
        this.error = e;
      });
  }
}
