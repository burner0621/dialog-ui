import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasCreate = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data.division) {
            this.selectedDivision = this.data.division;
        }
        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if (this.data.category) {
            this.selectedCategory = this.data.category;
        }
        if (this.data.currency) {
            this.selectedCurrency = this.data.currency;
        }
        if (this.data.incomeTax) {
            this.selectedIncomeTax = this.data.incomeTax;
        }
        if (this.data.vatTax) {
            this.selectedVatTax = this.data.vatTax;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
