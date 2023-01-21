import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
import numeral from 'numeral';
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var AccountLoader = require('../../../loader/account-loader');

@inject(Router, Service)
export class List {

    poStates = ["","Dibatalkan","PO Internal belum diorder","Sudah dibuat PO Eksternal","Sudah diorder ke Supplier","Barang sudah datang parsial","Barang sudah datang semua","Barang sudah diterima Unit"];
    poIntStates = ["","SUDAH","BELUM"];
    info = { page: 1,size:25};

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    attached() {
    }

    activate() {
    }

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            unit : this.unit ? this.unit.Id : "",
            epono : this.epoNo ? this.epoNo : "",
            article : this.article ? this.article : "",
            roNo : this.roNo ? this.roNo : "",
            poSerialNumber : this.poSerialNumber ? this.poSerialNumber : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.Id : "",
            username: this.account ? this.account.CreatedBy : "",
            status: this.poState?this.poState:"",
            ipoStatus:this.poIntState ?this.poIntState :"",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFromEx : this.dateFromEx ? moment(this.dateFromEx).format("YYYY-MM-DD") : "",
            dateToEx : this.dateToEx ? moment(this.dateToEx).format("YYYY-MM-DD") : ""
        };

    
        this.service.search(args)
            .then(result => {
                console.log(result.data);
                var resultTotal=0;
                //this.info.total=result.info.total; 
                this.data = result.data;
                for(var item of this.data)
                {
                    this.resultTotal= item.Total;
                    item.totalBudget =  numeral(item.prBudgetPrice * item.poDefaultQty).format("0,000.00");
                }
         this.info.total= this.resultTotal;
            })
    }

    reset() {
    this.unit = "",

    this.epoNo = "",
    this.article = "",
    this.roNo = "",
    this.poSerialNumber = "",
    this.doNo = "",
    this.supplier = "",
    this.account = "",
    this.poState="",
    this.poIntState="",
    this.dateFrom= "",
    this.dateTo="",
    this.dateFromEx= "",
    this.dateToEx="",
    this.data = [];
    this.info.page = 1;
    }

    exportToXls() {
        let args = {            
            page: this.info.page,
            size: this.info.size,
            unit : this.unit ? this.unit.Id : "",
            epono : this.epoNo ? this.epoNo : "",
            article : this.article ? this.article : "",
            roNo : this.roNo ? this.roNo : "",
            poSerialNumber : this.poSerialNumber ? this.poSerialNumber : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.Id : "",
            status: this.poState,
            ipoStatus:this.poIntState,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFromEx : this.dateFromEx ? moment(this.dateFromEx).format("YYYY-MM-DD") : "",
            dateToEx : this.dateToEx ? moment(this.dateToEx).format("YYYY-MM-DD") : ""
        };
        console.log(this.doNo);
        this.service.generateExcel(args.epono, args.unit, args.roNo, args.article, args.poSerialNumber,  args.doNo, args.ipoStatus, args.supplier, args.status, args.dateFrom, args.dateTo, args.dateFromEx, args.dateToEx);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    get unitLoader() {
        return UnitLoader;
    }
        unitView = (unit) => {
        return `${unit.Code}-${unit.Name}`
      }

    get categoryLoader() {
        return CategoryLoader;
    }
        categoryView = (category) => {
        return `${category.code}-${category.name}`
      }

    get supplierLoader() {
        return SupplierLoader;
    }
        supplierView = (supplier) => {
        return `${supplier.code}-${supplier.name}`
      }

    get accountLoader() {
      
        return AccountLoader;
    }
    accountView = (account) => {
         
        return `${account.CreatedBy}`;
  }
}