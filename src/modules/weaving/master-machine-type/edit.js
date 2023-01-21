import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    let errorIndex = 0;
    this.error = {};

    var CodeRegEx = new RegExp("([1-9])");
    if (!this.data.TypeName || this.data.TypeName === "") {
      this.data.TypeName = "";
    }

    if (!this.data.Speed) {
      this.data.Speed = 0;
    } else {
      if (!CodeRegEx.test(this.data.Speed)) {
        this.error.Speed = "Only Numbers (1-9) Allowed";
        errorIndex++;
      }
    }

    if (!this.data.MachineUnit || this.data.MachineUnit === "") {
      this.data.MachineUnit = "";
    }

    if (errorIndex == 0) {
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { Id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
    }
  }
}
