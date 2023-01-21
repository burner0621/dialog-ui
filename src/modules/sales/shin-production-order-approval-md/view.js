import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    orderNo = "";

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print(){
        this.service.getPdfById(this.data.Id);
    }

    approve(){
        this.service.approveMD(this.data.Id)
        .then(result => {
            this.list();
        });
    }

}