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
        this.deliveryOrder = await this.service.getDOById(this.data.DOId);
        this.selectedSupplier=this.data.Supplier;
        this.data.IncomeTax.toString = function () {
            return [this.Name, this.Rate]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }

        if(this.data.Items){
            for(var item of this.data.Items){
                item.Quantity=item.Quantity*(-1);
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }
}
