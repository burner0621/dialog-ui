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
        if(this.data.type == "OUT"){
            for (var item of this.data.inspectionMaterialProductionOrders) {
                item.productionOrderDetails = item.productionOrderDetails.filter(s => s.hasNextAreaDocument === false);
            }
            this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders.filter(s => s.productionOrderDetails.length > 0);
        }

    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save() {

        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            if (e.statusCode == 500) {
                if (e.error) {
                    alert(e.error);

                } else {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
            } else {
                this.error = e;
            }
        });
    }
}
