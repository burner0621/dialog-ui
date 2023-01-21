import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    getDisposition() {
        let flag = false;

        for (let item of this.data.MaterialDistributionNoteItems) {
            let exists = item.MaterialDistributionNoteDetails.filter(p => p.IsDisposition === true && p.ReceivedLength > 0).length > 0;

            if (exists) {
                flag = true;
                break;
            }
        }

        return flag;
    }

    saveCallback(event) {
        this.data.IsDisposition = this.getDisposition();
        this.data.IsApproved = false;

        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }
}
