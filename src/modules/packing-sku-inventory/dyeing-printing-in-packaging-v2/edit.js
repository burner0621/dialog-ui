import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.packagingProductionOrders = this.data.packagingProductionOrders.filter(s => s.hasOutputDocument === false);
        this.canEdit=true;
        
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save() {
        this.data.PackagingProductionOrders = this.data.packagingProductionOrders;
        
        
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}