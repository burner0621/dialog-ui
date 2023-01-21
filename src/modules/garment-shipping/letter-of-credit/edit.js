import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        
        this.tempDocNo=this.data.documentCreditNo;
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    async saveCallback(event) {
        this.data.available=false;
        if(this.data.documentCreditNo!= this.tempDocNo){
            var available = await this.service.search({size: 1, filter: JSON.stringify({ DocumentCreditNo: this.data.documentCreditNo })});
        
            this.data.available= available.data.length>0;
        }
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
