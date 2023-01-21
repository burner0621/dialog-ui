import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var AccountLoader = require('../../../loader/account-loader');
var PurchaseOrderLoader = require('../../../loader/purchase-request-all-loader');
var EPOLoader = require('../../../loader/purchase-order-external-loader');
var DivisionLoader = require('../../../loader/division-loader');

@inject(Router, Service)
export class List {

    poStates = ["","Dibatalkan","PO Internal belum diorder","Sudah dibuat PO Eksternal","Sudah diorder ke Supplier","Barang sudah datang parsial","Barang sudah datang semua","Barang sudah diterima Unit parsial","Barang sudah diterima Unit semua","Sudah dibuat SPB sebagian","Sudah dibuat SPB semua"];
    info = { page: 1,size:25};

    constructor(router, service) {
        this.service = service;
        this.router = router;
        // this.today = new Date();
        // // this.poStates = this.poStates.map(poState => {
        // //     poState.toString = function () {
        // //         return this.name;
        // //     }
        // //     return poState;
        // // })
        // this.data = [];
    }
    attached() {
    }

    activate() {
    }

    search(){
        //  this.error = {};

        // if (Object.getOwnPropertyNames(this.error).length === 0) {
            //this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            prNo: this.pr ? this.pr.no : "",
            supplierId:this.supplier? this.supplier._id : "",
            divisionCode: this.division ? this.division.Code : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            budgetId: this.budget ? this.budget._id : "",
            epoNo:this.epo? this.epo.no : "",
            staff: this.staffName? this.staffName.username : "",
            status: this.poState,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            dateToPO: this.dateToPO ? moment(this.dateToPO).format("MM/DD/YYYY") : "",
            dateFromPO: this.dateFromPO ? moment(this.dateFromPO).format("MM/DD/YYYY") : "",

        };
        // var dateFormat = "DD MMM YYYY";
        // var locale = 'id-ID';
        // var moment = require('moment');
        // moment.locale(locale);
        // if (!this.poState)
        //     this.poState = this.poStates[0];
        this.service.search(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                for (var item of this.data){
                    item.prDate=moment(item.prDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.prDate).format("DD MMM YYYY");
                    item.createdDatePR=moment(item.createdDatePR).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.createdDatePR).format("DD MMM YYYY");
                    item.receivedDatePO=moment(item.receivedDatePO).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.receivedDatePO).format("DD MMM YYYY");
                    item.epoDate=moment(item.epoDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoDate).format("DD MMM YYYY");
                    item.epoCreatedDate=moment(item.epoCreatedDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoCreatedDate).format("DD MMM YYYY");
                    item.epoExpectedDeliveryDate=moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY");
                    item.epoDeliveryDate=moment(item.epoDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoDeliveryDate).format("DD MMM YYYY");
                    item.doDate=moment(item.doDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.doDate).format("DD MMM YYYY");
                    item.doDeliveryDate=moment(item.doDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.doDeliveryDate).format("DD MMM YYYY");
                    item.urnDate=moment(item.urnDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.urnDate).format("DD MMM YYYY");
                    item.invoiceDate=moment(item.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.invoiceDate).format("DD MMM YYYY");
                    item.upoDate=moment(item.upoDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.upoDate).format("DD MMM YYYY");
                    item.dueDate=moment(item.dueDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.dueDate).format("DD MMM YYYY");
                    item.vatDate=moment(item.vatDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.vatDate).format("DD MMM YYYY");
                    item.incomeTaxDate=item.incomeTaxDate==null? "-" : moment(item.incomeTaxDate).format("DD MMM YYYY");
                    item.correctionDate=moment(item.correctionDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.correctionDate).format("DD MMM YYYY");

                    item.doQuantity=item.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    item.quantity=item.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    item.pricePerDealUnit=item.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.priceTotal=item.priceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.urnQuantity=item.urnQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    item.upoPriceTotal=item.upoPriceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.vatValue=item.vatValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.incomeTaxValue=item.incomeTaxValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.valueCorrection=item.valueCorrection.toLocaleString();
                }
            })
    }

    reset() {
        this.unit = "";
        this.category = "";
        this.epo = "";
        this.pr=null;
        this.purchaseOrder = "";
        this.supplier = "";
        this.division = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.poState ="";
        this.budget = "";
        this.staffName = "";
        this.dateFromPO = null;
        this.dateToPO = null;
        //this.data = [];
    }

    exportToXls() {
        let args = {
            
            prNo: this.pr ? this.pr.no : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            budgetId: this.budget ? this.budget._id : "",
            supplierId:this.supplier? this.supplier._id : "",
            divisionCode: this.division ? this.division.Code : "",
            epoNo:this.epo? this.epo.no : "",
            staff: this.staffName? this.staffName.username : "",
            status: this.poState,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            dateToPO: this.dateToPO ? moment(this.dateToPO).format("MM/DD/YYYY") : "",
            dateFromPO: this.dateFromPO ? moment(this.dateFromPO).format("MM/DD/YYYY") : "",

        };
        
        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }
    dateFromPOChanged(e) {
      var _startDate = new Date(e.srcElement.value);
      var _endDate = new Date(this.dateToPO);
      this.dateMin = moment(_startDate).format("YYYY-MM-DD");

      if (_startDate > _endDate || !this.dateTo) {
        this.dateToPO = e.srcElement.value;
      }

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    get epoLoader() {
        return EPOLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get purchaseOrderLoader() {
        return PurchaseOrderLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }
    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
      return `${division.Name}`;
    }
    
}
