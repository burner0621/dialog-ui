import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    dateFrom = null;
    dateTo = null;
    activate(params) {
        if (params.sdate != null || params.edate != null) {
            this.dateFrom = params.sdate;
            this.dateTo = params.edate;
            var pricetotals = 0;
            var percentage = [];
            var percentagetotal = 0;
            var persen = 0;
            var data = [];
            var amounts = [];
            var uri = "";
            this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
            this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
            uri = this.service.getDataUnit(this.dateFrom, this.dateTo);
        uri.then(data => {
            this.data = data;
            for(var item of data)
            {
                pricetotals= item.total;
                item.percentage=(item.amount*100/item.total).toFixed(2);  
                item.amount=item.amount.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            }
            this.pricetotals = pricetotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            this.percentagetotal = 100;
        })
    }
}

    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri = "";
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
            uri = this.service.getDataUnit(this.dateFrom, this.dateTo);
            uri.then(data => {
                    console.log(data);
                this.data = data;
                for(var item of data)
                {
                    pricetotals= item.total;
                    item.percentage=(item.amount*100/item.total).toFixed(2);  
                    item.amount=item.amount.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                }
                this.pricetotals = pricetotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                this.percentagetotal = 100;
            })
    }

    view(data, sdate, edate) {
        this.router.navigateToRoute('view', { id: data.divisionId, divisionName: data.divisionName, sdate: this.dateFrom, edate: this.dateTo });
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.service.generateExcel(this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}