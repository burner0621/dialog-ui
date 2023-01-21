import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    hasView = false;
    hasCreate = true;
    hasEdit = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { items: [] };
        this.data.isCustoms=true;
        this.error = {};
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        if(this.data.items.length>0){
            this.data.paymentType = this.data.items[0].paymentType;
            this.data.paymentMethod = this.data.items[0].paymentMethod;
            this.data.currency = this.data.items[0].currency;
            this.data.useVat = this.data.items[0].useVat;
            this.data.vat = this.data.items[0].vat;
            this.data.useIncomeTax = this.data.items[0].useIncomeTax;
            this.data.isPayVAT = this.data.items[0].isPayVAT;
            this.data.isPayIncomeTax = this.data.items[0].isPayIncomeTax;
            this.data.incomeTax = this.data.items[0].incomeTax;
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
