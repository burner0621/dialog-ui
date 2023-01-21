import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }


    deleteCallback(event) {
        this.service.delete(this.data).then(result => {
            alert(`delete data success`);
            this.cancelCallback();
        });
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

}