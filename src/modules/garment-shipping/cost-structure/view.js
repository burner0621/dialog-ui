import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isView = true;
    isEdit = false;
    isCreate = false;

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.hasEdit = true;
        this.hasCancel = true;
        if (this.data.isUsed == true) {
            this.hasDelete = false;
        }
        else {
            this.hasDelete = true;

        }

    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }
    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }
    delete(event) {
        if (confirm(`Hapus ${this.data.invoiceNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancel();
                })
                .catch(e => {
                    this.error = e;
                })
    }
}