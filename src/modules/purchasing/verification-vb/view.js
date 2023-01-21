import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class View {
  // hasCancel = true;
  // hasEdit = true;
  // hasDelete = true;

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.getById(id);
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.numberVB.Id });
  }

  delete(event) {
    // this.service.delete(this.data).then(result => {
    //     this.cancel();
    // });
    this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Verifikasi VB')
      .then(response => {
        if (response.ok) {
          this.service.delete(this.data)
            .then(result => {
              this.cancel();
            });
        }
      });
  }

}
