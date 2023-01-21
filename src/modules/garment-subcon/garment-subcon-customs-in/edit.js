import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  isEdit = true;
  constructor(router, service, salesService) {
    this.router = router;
    this.service = service;
    this.salesService = salesService;
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);
  }

  bind() {
    this.error = {};
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then((result) => {
        this.cancelCallback();
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
