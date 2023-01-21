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

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.unit = this.data.Unit;
        this.supplier = {Id: this.data.Supplier.Id, code: this.data.Supplier.Code, name: this.data.Supplier.Name};
        this.deliveryOrder = { "Id": this.data.DOId, "doNo": this.data.DONo };
        this.storage = this.data.Storage;
        this.URNType=this.data.URNType;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
