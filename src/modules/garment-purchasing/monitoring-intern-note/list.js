import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');
var InternLoader = require('../../../loader/garment-intern-note-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            no : this.internNote ? this.internNote.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            currencyId : this.currency ? this.currency._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                    _data.totalPrice=_data.price*_data.qty;
                    
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            no : this.internNote ? this.internNote.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            currencyId : this.currency ? this.currency._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    get internNoteLoader(){
        return InternLoader;
    }

    get currencyLoader(){
        return CurrencyLoader;
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.internNote = null;
        this.currency = null;
    }
}