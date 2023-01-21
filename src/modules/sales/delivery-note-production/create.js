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
    this.error = {};
  }

  back() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  save(event) {
      // console.log(this.data);
    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
        // this.__goToList();
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
