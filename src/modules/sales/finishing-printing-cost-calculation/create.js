import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback() {
        const DATA_TOPOST = {
            
        };
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.list();
            })
            .catch(e => {
                this.error = e;
            });
        // console.log(this.data);
    }
}
