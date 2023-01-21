import { inject,BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');

@inject(Router, BindingEngine, Service)
export class List {
  reprosesOption = ['','Bahan Baku', 'Bahan Pendukung'];

  
    purchaseRequest = {};
    filter = {isPosted: true};
    
    constructor(router, bindingEngine, service) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.router = router;
        this.today = new Date();
    }

    attached() {
    }

    activate(params) {
        if ( params.dateTo != null || params.category != null) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
            this.category = params.category;
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
                category : this.category ? this.category: "",
            }
            this.tjumcount = 0;
            this.tperOkCount = 0;
            this.tperOk = 0;
            this.tjumOk = 0;
            this.service.search(info)
                .then(result => {
                this.data = [];
                for (var _data of result.ReportHeader) {
                    // _data.supplier =_data.supplier ? _data.supplier : "-";
                    this.data.push(_data);

                    this.tjumOk += _data.OKStatusPercentage / 100 * _data.Total;
                    this.tjumcount +=_data.Total;
                }

                this.data = this.data.filter(datum => datum.Total > 0);
                this.tperOk = Math.floor(this.tjumOk/this.tjumcount *100);
            });
        } else {
        this.dateFrom='';
        this.dateTo='';
        this.category='';
            }
    }

    get prLoader(){
        return PRLoader;
    }

    get unitLoader(){
        return UnitLoader;
    }
    get categoryLoader(){
        return CategoryLoader;
    }
    get buyerLoader(){
        return BuyerLoader;
    }

    search() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
        }
        this.tjumcount = 0;
        this.tperOkCount = 0;
        this.tperOk = 0;
        this.tjumOk = 0;
        this.service.search(info)
            .then(result => {
                console.log(result);
                this.data = [];
                for (var _data of result.ReportHeader) {
                // _data.supplier =_data.supplier ? _data.supplier : "-";
                this.data.push(_data);

                this.tjumOk += _data.OKStatusPercentage / 100 * _data.Total;
                this.tjumcount +=_data.Total;
                }
                this.data = this.data.filter(datum => datum.Total > 0);
                this.tperOk = Math.floor(this.tjumOk/this.tjumcount *100);
        });
    }
    reset() {
  
        this.dateFrom = "";
        this.dateTo = "";
        this.category = "";
        this.data=[];
    }

    view(data, dateFrom, dateTo, category) {
        var info = {
            supplierCode : data.SupplierCode ? data.SupplierCode: "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
        }
        this.router.navigateToRoute('view', { id: data.SupplierCode, supplierCode: data.SupplierCode,info: info});
     }

    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
        }
        this.service.generateExcel(info)
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

}