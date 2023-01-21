import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasView = false;
    hasEdit = true;
    hasCreate = false;

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
        this.tipe = this.data.TransactionType;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        if(this.data.TransactionAmount > this.data.MachineQuantity)
        {
            alert("Jumlah Barang Keluar tidak Boleh melebihi stock");
        }else
        this.service.update(this.data).then(result => {
            alert("Data berhasil diubah");
            
        }).catch(e => {
            this.error = e;
        })
    }
}