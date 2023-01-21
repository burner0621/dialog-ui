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
        this.editCallback = null;
        this.data = await this.service.read(id);
        //this.selectedSewingDO=await this.service.getSewingDObyId(this.data.SewingDOId);
        for(var a of this.data.Items){
            if(a.RemainingQuantity != a.Quantity){
                
                this.deleteCallback = null;
                break;
            }
        }
        this.selectedUnit=this.data.Unit;
        this.selectedSewingOut={
            RONo:this.data.RONo
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     // if (confirm(`Hapus ${this.data.CutInNo}?`))
    //         this.service.delete(this.data)
    //             .then(result => {
    //                 alert(`delete data success`);
    //                 this.cancelCallback();
    //             })
    //             .catch(e => {
    //                 this.error = e;
    //             })
    // }
}