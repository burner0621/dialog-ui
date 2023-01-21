import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var DivisionLoader = require('../../../../../loader/division-loader');
var CategoryLoader = require('../../../../../loader/category-loader');
var CurrencyLoader = require('../../../../../loader/currency-loader');
@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    dateFrom = null;
    dateTo = null;
    divisi = null;
    unit = null;
    category = null;
    currency = null;

    get divisionLoader() {
        return DivisionLoader;
    }
    get categoryLoader() {
        return CategoryLoader;
    }
    get currencyLoader() {
        return CurrencyLoader;
    }
    currencyView = (currency) => {
        return `${currency.Code}`;
    }
    divisionView = (division) => {
        return `${division.Name}`;
    }
    activate() {
    }

    // @computedFrom('divisi')
    // get unitFilter() {
    //     if (this.divisi)
    //         return {
    //             "division.name": this.divisi.name
    //         }
    //     return {};
    // }


    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        var uri = this.service.getData(this.dateFrom, this.dateTo, this.divisi ? this.divisi.Id : "",  this.category ? this.category._id : "", this.currency ? this.currency.Id : "");
        uri.then(data => {
            this.data = data;
            for(var item of data)
            {
                pricetotals= item.total;
                item.percentage=(item.amountIDR*100/item.total).toFixed(2);  
                item.amount=item.amount.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                item.amountIDR=item.amountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            }
            this.pricetotals = pricetotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            this.percentagetotal = 100;
        })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.divisi = null;
        this.category = null;
        this.currency = null;
    }

    ExportToExcel() {
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.service.generateExcel(this.dateFrom, this.dateTo, this.divisi ? this.divisi.Id : "",  this.category ? this.category._id : "", this.currency ? this.currency.Id : "");
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}