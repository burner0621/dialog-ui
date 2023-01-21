import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
var moment = require("moment");

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var divisionName = params.divisionName;
        var dateFrom = params.sdate;
        var dateTo = params.edate;
        // this.data = await this.service.getDetailUnit(dateFrom,dateTo,id);
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri = "";
        this.divisionName=params.divisionName;
        uri = this.service.getDetailUnit(dateFrom, dateTo, id);

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

    list(sdate, edate) {
        this.router.navigateToRoute('list', { sdate: this.dateFrom, edate: this.dateTo });
    }

}
