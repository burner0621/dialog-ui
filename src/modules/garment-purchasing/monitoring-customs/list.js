import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Router, Service)
export class List {
    typeCustoms = ["","BC 262", "BC 23","BC 40", "BC 27"]
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier._id : "",
            customsType : this.customsType ? this.customsType : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data = result;
            });
    }
    
    ExportToExcel() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier._id : "",
            customsType : this.customsType ? this.customsType : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.customsType = '';
        this.no = '';
        this.data = [];
        // this.newData = [];
    }
}