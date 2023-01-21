import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
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
    if (this.data.Name) {
      if (this.data.Name.name) {
        var supplierName = this.data.Name.name ? this.data.Name.name : "";
        var supplierId = this.data.Name._id ? this.data.Name._id : "";
        this.data.Name = supplierName;
        this.data.CoreSupplierId = supplierId;
      } else {
        var supplierName = "";
        var supplierId = "";
        this.data.Name = supplierName;
        this.data.CoreSupplierId = supplierId;
      }
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
