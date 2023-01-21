import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    saveCallback(event) {
        this.data.IsReturn = this.data.Details.every(p => p.Retur === "Ya");

        this.service.create(this.data)
            .then(result => {
                alert(`Data berhasil dibuat`);
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {

                this.error = e;
            })
    }

}