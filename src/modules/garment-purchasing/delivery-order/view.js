import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    hasView = true;
    hasCreate = false;
    hasEdit = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isReceived = false;

    async activate(params) {
        var id = params.id;
        this.isCustomsDisplay = "Ya";
        this.data = await this.service.getById(id);
        this.supplier = this.data.supplier;
        // if(this.data.isCustoms==true)
        //     this.isCustomsDisplay="Ya"
        // else
        //     this.isCustomsDisplay="Tidak"
        if (this.data.customsId==0) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
    }

    cancel(event) {
        var r = confirm("Apakah Anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
        // this.router.navigateToRoute('list');
    }

    edit(event) {
        var r = confirm("Apakah Anda yakin akan mengubah data ini?");
        if (r == true) {
            this.router.navigateToRoute('edit', { id: this.data.Id });
        }
        // this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        var r = confirm("Apakah Anda yakin akan menghapus data ini?");
        if (r == true) {
            this.service.delete(this.data).then(result => {
                this.cancel();
            });
        } 
        
    }
}
