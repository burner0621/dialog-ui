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
        this.supplier = this.data.supplier;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        if(this.data.items.length>0){
            if(this.data.items[0].paymentType){
                this.data.paymentType = this.data.items[0].paymentType;
                this.data.paymentMethod = this.data.items[0].paymentMethod;
                this.data.currency = this.data.items[0].currency;
                this.data.useVat = this.data.items[0].useVat;
                this.data.useIncomeTax = this.data.items[0].useIncomeTax;
                this.data.incomeTax = this.data.items[0].incomeTax;
                this.data.isPayVAT = this.data.items[0].isPayVAT;
                this.data.vat = this.data.items[0].vat;
                this.data.isPayIncomeTax = this.data.items[0].isPayIncomeTax;
            }
        }
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}