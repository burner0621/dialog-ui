import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    readOnlyNoBon =true;
    async activate(params) {
        
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    // save() {
        
    //     this.service.update(this.data).then(result => {
    //         this.view();
    //     }).catch(e => {
    //         this.error = e;
    //     })
    // }
    save() {

            
            this.data.area = "PACK";
            this.data.packagingQty = this.packQtyValue;
            this.data.packagingUnit = this.packUnitValue;
        
        this.service.update(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                // this.router.navigateToRoute('view', {}, { replace: true, trigger: true });
                this.view();
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }
}