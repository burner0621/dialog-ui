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
            this.data.shippingProductionOrders = this.data.shippingProductionOrders.filter(s => s.hasNextAreaDocument === false);
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