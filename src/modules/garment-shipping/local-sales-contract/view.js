import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if(this.data){
            for(var item of this.data.items){
                if(item.remainingQuantity!=item.quantity){
                    this.deleteCallback=null;
                    this.editCallback=null;
                    break;
                }
                if(item.comodity.name == null){
                    item.comodity.name == "-";
                }
            }
            
        }
        this.selectedTransactionType=this.data.transactionType;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

}
