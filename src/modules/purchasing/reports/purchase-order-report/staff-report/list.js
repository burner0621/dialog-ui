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


    activate(params) {
        if (params.sdate != null || params.edate != null || params.divisi != null) {
            this.dateFrom = params.sdate;
            this.dateTo = params.edate;
             this.divisi = params.divisi;
             var counts=0;
        var counttotals=0;
            var persen = 0;
            var data = [];
            var uri = "";
     
            if (this.dateFrom == undefined && this.dateTo == undefined && this.divisi == undefined )
                uri = this.service.getDataStaffnoDate();
            else
                uri = this.service.getDataCoba(this.dateFrom, this.dateTo, this.divisi);

            uri.then(data => {
                this.data = data;
for (var scount of data) {
                counttotals += scount.count;
            }
            this.counttotals = counttotals;          
                this.divisi = "";
                }
            )
             
  
        }
    }

    searching() {
        var data = [];
        var uri = "";
         var counts=0;
        var counttotals=0;
            uri = this.service.getDataStaff(this.dateFrom, this.dateTo, this.divisi);

        uri.then(data => {
            this.data = data;

        for (var scount of data) {
                counttotals += scount.count;
            }
            this.counttotals = counttotals;   
        })
        
    }

    view(data, sdate, edate) {
        this.router.navigateToRoute('view', { id: data._id.name, staff: data._id.name, divisi: data.div, sdate: this.dateFrom, edate: this.dateTo });
    }

    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }


    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}