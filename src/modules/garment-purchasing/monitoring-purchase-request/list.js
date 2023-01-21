import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

@inject(Router, Service)
export class List {

    prStates = [
        {
            "name": "",
            "value": -1
        },
        {
            "name": "Dibatalkan",
            "value": 0
        }, {
            "name": "Belum diterima Pembelian",
            "value": 2
        }, {
            "name": "Sudah diterima Pembelian",
            "value": 7
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        }, {
            "name": "Barang sudah datang sebagian",
            "value": 4
        }, {
            "name": "Barang sudah datang semua",
            "value": 9
        }
    ];
    purchaseRequest = {};
    filter = {isPosted: true};
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.prStates = this.prStates.map(prState => {
            prState.toString = function () {
                return this.name;
            }
            return prState;
        })
    }
    attached() {
    }

    activate() {

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
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        if (!this.prState)
            this.prState = this.prStates[0];


        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.buyer ? this.buyer._id : "", this.purchaseRequest ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value)
            .then(result => {
                this.data = [];
                console.log(result);
                var counter = 1;
                for (var _data of result) {
                        var status = _data.status ? _data.status.label : "-";

                        if (_data.status.value === 4 || _data.status.value === 9) {
                            status = _data.deliveryOrderNos.length > 0 ? `${status} (${_data.deliveryOrderNos.join(", ")})` : status;
                        }
                        _data.unit = `${_data.division} - ${_data.unit}`;
                        _data.productQty = _data.productQty ? _data.productQty : 0;
                        _data.status = status;
                        this.data.push(_data);
                    
                }
            })
    }
    reset() {
        this.purchaseRequest = {};
        this.category = null;
        this.unit = null;
        this.buyer = null;
        this.dateFrom = "";
        this.dateTo = "";
        this.prState = this.prStates[0];;
    }

    ExportToExcel() {
        if (!this.prState)
            this.prState = this.prStates[0];

        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.buyer ? this.buyer._id : "", this.purchaseRequest ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}