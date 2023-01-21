import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.data.UnitDONo = this.data.UnitDONo ? this.data.UnitDONo : "";
        if (this.data) {
            this.selectedUnitDO = {
                UnitDONo: this.data.UnitDONo
            };

            if(this.data.IsUsed){
                this.editCallback=null;
                this.deleteCallback=null;
            }
            if(this.data.ReturnType=="RETUR"){
                this.editCallback=null;
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        // if (confirm(`Hapus ${this.data.CutInNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    alert(`delete data success`);
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }
}
