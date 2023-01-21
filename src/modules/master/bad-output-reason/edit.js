import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};
        this.item = "";
    }

    cancel() {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save() {
        if(this.data.machines.length > 0){
            this.item = "";
            this.service.update(this.data)
                .then(result => {
                    this.cancel();
                })
                .catch(e => {
                    this.error = e;
                })
        }else{
            this.item = "machine is required";
        }
    }
}