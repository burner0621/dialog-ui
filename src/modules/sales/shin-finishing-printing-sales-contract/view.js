import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.dataCC = await this.service.getCCbyPreSC(this.data.PreSalesContract.Id);
        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
        this.canEdit=true;
        if(this.data.referenceNumber && this.data.referenceNumber!=""){
            this.data.reference={orderNo:this.data.referenceNumber};
        }
        else{
            this.data.reference={};
        }
        // console.log(this.data.remainingQuantity);
        if(this.spp){
            this.canEdit=false;
            
        }

    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}