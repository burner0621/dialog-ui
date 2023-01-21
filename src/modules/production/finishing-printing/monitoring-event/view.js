import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

var moment = require('moment');

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.Machine=this.data.Machine;
        this.productionOrder=this.data.ProductionOrder;

        if (this.data.DateEnd == null)
            delete this.data.DateEnd;

        if (this.data.TimeInMillisEnd == null)
            delete this.data.TimeInMillisEnd;
    }

    back() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.back();
        });
    }
}