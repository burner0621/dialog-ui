import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import moment from 'moment';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

async activate(params) {
        this.info = params.info;
        var uri = this.service.getDetail(this.info);
        uri.then(data => {
             this.data = data;
        })
    }

    ExportToExcel() {
        var info = {
            supplierCode : this.info.supplierCode ? this.info.supplierCode: "",
            dateFrom : this.info.dateFrom ? moment(this.info.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.info.dateTo ? moment(this.info.dateTo).format("YYYY-MM-DD"): "",
            category : this.info.category ? this.info.category: "",
        }
        this.service.generateExcel2(info)
    }

    list() {
        this.router.navigateToRoute('list', { dateFrom: this.info.dateFrom, dateTo: this.info.dateTo, 
            category: this.info.category});
    }

}
