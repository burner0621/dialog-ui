import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
  readOnlyViewEdit = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.data.Tags = "weaving-products";
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
    this.error = {};
    if (
      this.data.MaterialTypeId == undefined ||
      this.data.MaterialTypeId == null ||
      this.data.MaterialTypeId == ""
    ) {
      this.data.MaterialTypeId = "";
    } else {
      var yarnMaterialId = this.data.MaterialTypeId.Id
        ? this.data.MaterialTypeId.Id
        : "";
      this.data.MaterialTypeId = yarnMaterialId;
    }

    if (
      this.data.YarnNumberId == undefined ||
      this.data.YarnNumberId == null ||
      this.data.YarnNumberId == ""
    ) {
      this.data.YarnNumberId = "";
    } else {
      var yarnNumberId = this.data.YarnNumberId.Id
        ? this.data.YarnNumberId.Id
        : "";
      this.data.YarnNumberId = yarnNumberId;
    }

    if (
      this.data.Code == undefined ||
      this.data.Code == null ||
      this.data.Code == ""
    ) {
      this.data.Code = "";
    }

    if (this.data.MaterialTypeId == "" || this.data.YarnNumberId == "") {
      this.data.Name = "";
    }

    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
