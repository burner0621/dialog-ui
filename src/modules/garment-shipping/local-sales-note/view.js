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
        console.log(this.data)
        this.selectedTransactionType = this.data.transactionType;
        if(this.data.isUsed){
            this.editCallback=null;
            this.deleteCallback=null;
        }
        if(this.data.isRejectedShipping){
            this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + this.data.rejectedReason;
        }
        else if(this.data.isRejectedFinance){
            this.alertInfo = "<strong>Alasan Reject oleh Finance:</strong> " + this.data.rejectedReason;
        }
        else{
            this.alertInfo ="";
        }
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
