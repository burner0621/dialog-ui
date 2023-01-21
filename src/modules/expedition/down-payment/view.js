import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.ressearch = params.search;
  }

  cancel(event) {
    this.router.navigateToRoute('list' , {search: this.ressearch });
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  delete(event) {
    // this.service.delete(this.data).then(result => {
    //     this.cancel();
    // });
    this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Bukti Pemasukan Bank')
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
