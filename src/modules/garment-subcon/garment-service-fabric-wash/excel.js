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

    // excel() {
    //     this.info = {};
    //     if (this.filter) {
    //         this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
    //         this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
    //     }
    //     this.service.getExcel(this.info);
    // }
    excel() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let info = {
            // ProductionOrderId: this.productionOrder? this.productionOrder.Id : "",
            // Unit: this.unit,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):""
        };
        console.log(info);
            this.service.generateExcel(info)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }



}
