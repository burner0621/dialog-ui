import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

var moment = require('moment');

@inject(Router, Service)
export class Edit {
    // selectedProductionOrderDetail = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.Machine = this.data.Machine;
        this.productionOrder = this.data.ProductionOrder;
        if (this.data.DateEnd == null)
            delete this.data.DateEnd;

        if (this.data.TimeInMillisEnd == null)
            delete this.data.TimeInMillisEnd;

        // if (this.data.selectedProductionOrderDetail.colorRequest) {
        //     this.data.selectedProductionOrderDetail.toString = function () {
        //         return `${this.colorRequest}`;
        //     };
        // }
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}
