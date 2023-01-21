import { inject, Lazy, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
    this.MaterialType = this.data.MaterialType;
    this.ConstructionNumber = this.data.ConstructionNumber;
    this.WarpType = this.data.WarpType;
    this.WeftType = this.data.WeftType;
    this.TotalYarn = this.data.TotalYarn;
  }

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Ubah", routing ke 'edit'
  editCallback(event) {
    this.router.navigateToRoute("edit", { Id: this.data.Id });
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
