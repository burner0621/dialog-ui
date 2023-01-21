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
    if (!this.data.Code || this.data.Code === "") {
      this.data.Code = "";
    }

    if (!this.data.Number) {
      this.data.Number = 0;
    } else {
      if (!CodeRegEx.test(this.data.Number)) {
        this.error.Number = "Only Numbers (1-9) Allowed";
        errorIndex++;
      }

      if (this.data.AdditionalNumber) {
        if (!CodeRegEx.test(this.data.AdditionalNumber)) {
          this.error.AdditionalNumber = "Only Numbers (1-9) Allowed";
          errorIndex++;
        }
      }
    }

    if (!this.data.RingType || this.data.RingType === "") {
      this.data.RingType = "";
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
