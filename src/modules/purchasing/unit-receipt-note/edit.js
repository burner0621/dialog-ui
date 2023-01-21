import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.unit = this.data.unit;
        this.supplier = this.data.supplier;
        this.deliveryOrder = this.data.items;
        if(this.data.doNo){
            this.deliveryOrder.no=this.data.doNo;
            
        }
        for(var _item of this.deliveryOrder){
            _item.deliveredUom=_item.product.uom;
        }
        if(this.data.unit && this.data.supplier){
            this.data.unitId=this.data.unit._id;
            this.data.supplierId=this.data.supplier._id;
        }
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        if(typeof this.data.date === 'object')
            this.data.date.setHours(this.data.date.getHours() - this.data.date.getTimezoneOffset() / 60);

            this.service.update(this.data).then(result => {
                alert("Data berhasil diubah");
                this.view();
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
