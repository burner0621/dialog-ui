import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    canEdit = true;
    async activate(params) {
        var id = params.id;
        console.log(id);
        this.data = await this.service.getById(id);
        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
        // this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders.filter(s => s.hasOutputDocument === false);
        this.canEdit = this.data.inspectionMaterialProductionOrders.some(s => s.hasOutputDocument === false);
        
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
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert(e.error);
                } else {
                    this.error = e;
                }
            });
    }
}