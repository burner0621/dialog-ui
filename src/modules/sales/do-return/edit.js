import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

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

  view(data) {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  save() {
    this.service
      .update(this.data)
      .then((result) => {
        this.view();
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
