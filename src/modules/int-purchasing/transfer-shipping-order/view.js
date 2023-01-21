import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);

        let isUsed = await this.service.isUsedByUnitReceiptNotes(id);

        this.editCallback = !this.data.IsPosted ? this.editCallback : null;
        this.deleteCallback = !this.data.IsPosted ? this.deleteCallback : null;

        this.hasUnpost = this.data.IsPosted && !isUsed;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.SONo}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }

    unpost(event) {
        this.service.unpost(this.data.Id).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
        })
    }

}
