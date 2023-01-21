import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasView = false;

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
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        if(this.data.items){
            for(var item of this.data.items){
                if(!item.poId || item.poId==0){
                    item.poId= item._id ? item._id : item.Id;
                    delete item._id;
                    delete item.Id;
                    if(item.details)
                        for(var detail of item.details){
                            detail.poItemId= detail._id ? detail._id : detail.Id;
                            delete detail._id;
                            delete detail.Id;
                        }
                }
                item.unit=this.data.unit;
            }
        }

        this.service.update(this.data).then(result => {
            alert("Data berhasil diubah");
            this.cancel();
        }).catch(e => {
            if (e.statusCode == 500) {
                alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
            } else if (e.statusCode == 400){
                alert("Terdapat data yang tidak valid, mohon dicek kembali");
            } else {
                this.error = e;
            }
        })
    }
}

