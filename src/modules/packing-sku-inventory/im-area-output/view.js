import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    canEdit = true;
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // if (this.data.type == "OUT") {
        //     for (var item of this.data.inspectionMaterialProductionOrders) {
        //         item.productionOrderDetails = item.productionOrderDetails.filter(s => s.hasNextAreaDocument === false);
        //     }
        //     this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders.filter(s => s.productionOrderDetails.length > 0);
        // }

        // this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders.filter(s => s.hasNextAreaDocument === false);
        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);



        this.canEdit = this.data.type == "ADJ" || this.data.inspectionMaterialProductionOrders.flatMap(s => s.productionOrderDetails).some(s => s.hasNextAreaDocument === false);

    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            }).catch(e => {
                if (e.statusCode == 500) {
                    alert(e.error);
                } else {
                    this.error = e;
                }
            });
    }
}
