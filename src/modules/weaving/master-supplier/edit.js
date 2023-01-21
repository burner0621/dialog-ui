import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    this.error = {};
    var index = 0;
    var emptyFieldName = "Semua Field Harus Diisi";

    if (
      this.data.code == null ||
      this.data.code == undefined ||
      this.data.code == ""
    ) {
      this.error.code = "Kode Supplier Tidak Boleh Kosong";
      index++;
    }
    if (
      this.data.name == null ||
      this.data.name == undefined ||
      this.data.name == ""
    ) {
      this.error.name = "Nama Supplier Tidak Boleh Kosong";
      index++;
    }
    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      this.service.update(this.data).then(result => {
        this.router.navigateToRoute("list", { id: this.data.id });
      });
    }
  }
}
