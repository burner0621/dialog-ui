import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {
        this.bank = params.bank;
        this.status = params.status;
        this.sourceType = params.sourceType;
    }

    bind(params) {
        this.data = {};
        this.data.Status = "OUT";
        this.error = {};
    }

    cancel(event) {
        this.data = {};
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        //auto assign status out
        // this.data.Status = "OUT";
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                let params = {
                    bank: this.data.Bank,
                    // status: "IN",
                    sourceType: "Operasional"
                }
                this.router.navigateToRoute('create', params, { replace: true, trigger: true });
            })
            .catch(error => {
                this.error = error;
            });
    }
}