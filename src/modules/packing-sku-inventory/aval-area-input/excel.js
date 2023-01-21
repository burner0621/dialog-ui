import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    list() {
        this.router.navigateToRoute('list');
    }

    excel() {
        this.info = {};
        if (this.filter) {
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        this.service.generateExcel(this.info);
    }



}
