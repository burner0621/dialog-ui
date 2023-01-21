import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.cashflowType = await this.service.getBudgetCashflowTypeById(this.data.CashflowTypeId);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {

        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
            })
            .catch(e => {
                this.error = e;
            })
    }
}
