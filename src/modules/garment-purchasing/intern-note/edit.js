import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.currency = this.data.currency;
        this.supplier = this.data.supplier;
        // console.log(this.supplier);
        this.data.items.map((items) => {
            items.check = true;
        });
        this.data.isView = false;
    }

    bind() {
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
