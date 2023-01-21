import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../../loader/unit-loader');
var CategoryLoader = require('../../../../../loader/category-loader');
var DivisionLoader = require('../../../../../loader/division-loader');
@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    unit=null;
    category=null;
    dateFrom = null;
    dateTo = null;

    get divisionLoader() {
        return DivisionLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }
    get categoryLoader() {
        return CategoryLoader;
    }
    divisionView = (division) => {
        return `${division.Name}`;
    }
    activate() {
    }
    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var data = [];
        var amounts = [];
        var uri = ""; 
    
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        uri = this.service.getDataSpl(this.divisi ? this.divisi.Id : "", this.unit, this.category, this.dateFrom,  this.dateTo);
      
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

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.category = null; 
        this.divisi = null; 
    }

    ExportToExcel() {
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        
      
        this.service.generateExcel(this.divisi ? this.divisi.Id : "", this.unit, this.category, this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}