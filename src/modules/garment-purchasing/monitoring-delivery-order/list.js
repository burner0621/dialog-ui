import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');
var POEksLoader = require('../../../loader/garment-purchase-order-external-loader');
var DOLoader = require('../../../loader/garment-delivery-order-loader');

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
            no: this.deliveryOrder ? this.deliveryOrder.no : "",
            poEksNo : this.purchaseOrderExternal ? this.purchaseOrderExternal.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                    _data.price=parseFloat(_data.price) * parseFloat(_data.delivered);
                    _data.supplierType=_data.supplierType ? "Import":"Lokal";
                    _data.customs=_data.customs ? "Ya":"Tidak";
                    this.data.push(_data);     
                }
            });
    }
    
    ExportToExcel() {
        var info = {
            no: this.deliveryOrder ? this.deliveryOrder.no : "",
            poEksNo : this.purchaseOrderExternal ? this.purchaseOrderExternal.no : "",
            supplierId : this.supplier ? this.supplier._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    get poEksLoader(){
        return POEksLoader;
    }

    get deliveryOrderLoader(){
        return DOLoader;
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.purchaseOrderExternal = null;
        this.deliveryOrder = null;
        // this.newData = [];
    }
}