import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    isView = true

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.deliveryOrder = await this.service.getdeliveryOrderById(this.data.DOId);
        this.selectedSupplier=this.data.Supplier;
        this.correctionType = this.data.CorrectionType;
        this.deliveryOrder = { doNo:this.data.DONo};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }
}