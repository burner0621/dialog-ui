import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class View {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Memo')
            .then(response => {
                if (response.ok) {
                    this.service.delete(this.data)
                        .then(result => {
                            this.list();
                        });
                }
            });
    }
}
