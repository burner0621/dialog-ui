import { inject, BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');

@inject(Router, BindingEngine, Service)
export class List {

    purchaseRequest = {};
    filter = { isPosted: true };

    constructor(router, bindingEngine, service) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.router = router;
        this.today = new Date();

    }

    termPaymentOptions = ['', 'T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE', 'DAN LIRIS'];

    typePaymentOptions = ['', 'T/T BEFORE', 'T/T AFTER', 'FREE', 'CASH', 'EX MASTER FREE', 'EX MASTER BELI', 'EX MASTER GUDANG'];


    attached() {
    }

    activate(params) {
        if (params.dateTo != null || params.category != null) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
            this.paymentMethod = params.paymentMethod;
            this.paymentType = params.paymentType;
            var info = {
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                paymentMethod: this.paymentMethod,
                paymentType: this.paymentType
            }
            this.tjumcount = 0;
            this.tperOkCount = 0;
            this.tperOk = 0;
            this.tjumOk = 0;
            this.service.search(info)
                .then(result => {
                    this.data = [];
                    for (var _data of result) {
                        _data.supplier = _data.supplier ? _data.supplier : "-";
                        this.data.push(_data);

                        this.tjumOk += _data.jumlahOk;
                        this.tjumcount += _data.jumlah;
                    }
                    this.tperOk = Math.floor(this.tjumOk / this.tjumcount * 100);
                });
        } else {
            this.dateFrom = '';
            this.dateTo = '';
        }
    }


    search() {
        var info = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            paymentMethod: this.paymentMethod,
            paymentType: this.paymentType
        }
        this.tjumcount = 0;
        this.tperOkCount = 0;
        this.tperOk = 0;
        this.tjumOk = 0;
        this.service.search(info)
            .then(result => {
                this.data = [];
                for (var _data of result) {
                    _data.supplier = _data.supplier ? _data.supplier : "-";
                    this.data.push(_data);

                    this.tjumOk += _data.jumlahOk;
                    this.tjumcount += _data.jumlah;
                }
                this.tperOk = Math.floor(this.tjumOk / this.tjumcount * 100);
            });
    }
    reset() {

        this.dateFrom = "";
        this.dateTo = "";
        this.paymentMethod = "";
        this.paymentType = "";
        this.data = [];

    }

    view(data, dateFrom, dateTo) {
        var info = {
            supplierCode: data.supplier.Code ? data.supplier.Code : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            paymentMethod: this.paymentMethod,
            paymentType: this.paymentType
        }
        this.router.navigateToRoute('view', { id: data.supplier.Code, supplierCode: data.supplier.Code, info: info });
    }

    ExportToExcel() {
        var info = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            paymentMethod: this.paymentMethod,
            paymentType: this.paymentType
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