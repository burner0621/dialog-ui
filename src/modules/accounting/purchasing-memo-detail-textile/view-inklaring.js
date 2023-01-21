import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";

@inject(Router, Service, Dialog)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  isShowing = false;
  isShowingAmount = true;

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.getById(id);

    if (this.data.MemoIsCreated) {
      this.hasEdit = false;
      this.hasDelete = false;
    }
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  edit(event) {
    this.router.navigateToRoute("edit-inklaring", { id: this.data.Id });
  }

  delete(event) {
    // this.service.delete(this.data).then(result => {
    //     this.cancel();
    // });
    this.dialog
      .prompt(
        "Apakah anda yakin akan menghapus data ini?",
        "Hapus Data Realisasi VB Inklaring Non PO"
      )
      .then((response) => {
        if (response.ok) {
          this.service.delete(this.data).then((result) => {
            this.cancel();
          });
        }
      });
  }
}
