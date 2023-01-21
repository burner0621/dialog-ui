import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
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
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        if (!this.error.Number) {
          this.error = e;
        }
      });
    }
  }
}
