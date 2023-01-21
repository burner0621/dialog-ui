import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var AccountLoader = require('../../../loader/account-loader');
var PurchaseOrderLoader = require('../../../loader/purchase-order-by-user-loader');

@inject(Router, Service)
export class List {
   
    status = [
        {
            "name": "",
            "value": -1
        }, {
            "name": "Dibatalkan",
            "value": 0
        }, {
            "name": "TO Internal belum diorder",
            "value": 1
        }, {
            "name": "Sudah dibuat TO Eksternal",
            "value": 2
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        }, {
            "name": "Barang sudah datang sebagian",
            "value": 4
        }, {
            "name": "Barang sudah datang semua",
            "value": 5
        }, {
            "name": "Barang sudah diterima Unit sebagian",
            "value": 6
        }, {
            "name": "Barang sudah diterima Unit semua",
            "value": 7
       
        }];


    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.status = this.status.map(status => {
            status.toString = function () {
                return this.name;
            }
            return status;
        })
        this.data = [];
    }
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.Id });
    }

    search() {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        if (!this.status)
            this.status = this.status[0];
        this.service.search("TRF1180001")
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.TRNo = "";
        this.ITONo = "";
        this.Unit = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.status = this.status[0];
        
    }

    exportToXls() {
        if (!this.poState)
            this.poState = this.poStates[0];
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.purchaseOrder ? this.purchaseOrder.purchaseRequest.no : "", this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo, this.poState.value, this.budget ? this.budget._id : "", this.staffName ? this.staffName.username : "");
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

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
}