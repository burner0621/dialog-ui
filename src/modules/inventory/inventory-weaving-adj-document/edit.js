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
        if (this.data.bon && this.data.type == "OUT") {
            this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput(this.data.bon.id);
            for (var item of this.data.warehousesProductionOrders) {
                item.productionOrderItems = item.productionOrderItems.filter(s => s.hasNextAreaDocument === false);
            }
            this.data.warehousesProductionOrders = this.data.warehousesProductionOrders.filter(s => s.productionOrderItems.length > 0);
        }
        this.canEdit = true;
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save() {
        var sppWarehouseList = [];
        if (this.data.type == "OUT") {
            this.data.displayWarehousesProductionOrders.forEach(element => {
                element.productionOrderItems
                    // .filter((s) => s.IsSave === true)
                    .forEach(item => {
                        sppWarehouseList.push(item);
                    })
            });
            this.data.warehousesProductionOrders = sppWarehouseList;
        } else {
            this.data.warehousesProductionOrders = this.data.adjWarehousesProductionOrders;
        }
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}