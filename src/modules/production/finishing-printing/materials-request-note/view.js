import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Dialog } from '../../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
import { Service } from './service';


@inject(Router, Service, Dialog)
export class View {
  isView = true;
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

  }

  get isAwal() {
    if (this.data.RequestType.toUpperCase() === "AWAL")
      return true;
    return false;
  }

  generateMessage() {
    var message = "<div>Apakah anda yakin akan menghapus data ini?</div>";
    return message;
  }

  list() {
    this.router.navigateToRoute('list');
  }

  promptDelete() {
    this.dialog.show(AlertView, { message: this.generateMessage() })
      .then(response => {
        if (!response.wasCancelled) {
          this.delete();
        }
      });
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  complete(event) {
    this.router.navigateToRoute('complete', { id: this.data.Id });
  }

  delete(event) {
    this.service.delete(this.data)
      .then(result => {
        this.list();
      });
  }
}
