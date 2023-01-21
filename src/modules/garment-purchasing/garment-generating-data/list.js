import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
 
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    dateFrom = null;
    dateTo = null;

    attached() {
    }

    activate() {

    }

    ExportToExcel() {
         this.service.exportData(this.dateFrom,this.dateTo)
        .then(response => {
            if (response)
            {
                alert("Data Pembelian Garment Berhasil Di Generate");
            }
        })
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    }
    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }
}