import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
var PackingReceiptLoader = require('../../../../loader/packing-receipt-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');
var AccountLoader = require('../../../../loader/account-loader');



@inject(Router, Service)

export class List {

    info = {
        packingCode: "",
        buyer: "",
        productionOrderNo: "",
        _createdBy: "",
        dateFrom: "",
        dateTo: "",

    };

    packingCode = null;
    buyer = null;
    productionOrderNo = null;
    _createdBy = null;
    dateFrom = null;
    dateTo = null;

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.newData = [];
    }

    get packingReceiptLoader() {
        return PackingReceiptLoader;
    }
    
    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get buyerLoader() {
      return BuyerLoader;
    }

    get accountLoader() {
      return AccountLoader;
    }

    searching() {
        if (this.filter) {
            this.info.packingCode = this.filter.packingCode ? this.filter.packingCode.packingCode : "";
            this.info.buyer = this.filter.buyer ? this.filter.buyer.name : "";
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.orderNo : "";
            this.info._createdBy = this.filter._createdBy ? this.filter._createdBy.username : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then((result) => {
                this.newData = [];
                var tempData;
                this.data = result.data;
                this.no = 0;
                for (var result of this.data) {
                    if (result.items) {
                        for (var item of result.items) {
                            tempData = {};
                            this.no += 1;
                            tempData.no = this.no;
                            tempData.packingCode = result.packingCode;
                            tempData.date = result.date;
                            tempData.buyer = result.buyer;
                            tempData.productionOrderNo = result.productionOrderNo;
                            tempData.colorName = result.colorName;
                            tempData.construction = result.construction;
                            tempData._createdBy = result._createdBy;
                            tempData.packingUom = result.packingUom;
                            tempData.product = item.product;
                            tempData.quantity = item.quantity;
                            tempData.remark = item.remark;
                            tempData.notes = item.notes;
                            this.newData.push(tempData);
                        }
                    }
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    exportToExcel() {
        if (this.filter) {
            this.info.packingCode = this.filter.packingCode ? this.filter.packingCode.packingCode : "";
            this.info.buyer = this.filter.buyer ? this.filter.buyer.name : "";
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.productionOrderNo : "";
            this.info._createdBy = this.filter._createdBy ? this.filter._createdBy.username : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    reset() {
        this.filter = {};
        this.data = [];
        this.newData = [];
    }

}
