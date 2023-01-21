import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');
var InvoiceLoader = require('../../../loader/garment-invoice-note-loader');

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
            no : this.invoice ? this.invoice.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                    _data.tax=_data.tax ? "Ya" : "Tidak";
                    _data.payTax=_data.payTax? "Ya":"Tidak";
                    _data.vat=_data.vat ? "Ya" : "Tidak";
                    _data.totalPrice=_data.price*_data.qty;
                    _data.vatType=_data.vatName + " " + _data.vatRate;
                    this.data.push(_data);
                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            no : this.invoice ? this.invoice.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    get invoiceLoader(){
        return InvoiceLoader;
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.invoice = null;
        // this.newData = [];
    }
}