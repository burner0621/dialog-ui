import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit=true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        //let id = params.id;
        //this.data = await this.service.read(id);

    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
        this.data.Date=new Date();
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}