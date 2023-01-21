import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasVoid = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.filter={
                "buyer.code" : this.data.buyer.code
            };
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    update() {
        this.data.isVoid = true;
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            });
    }
}