import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';

var ShipmentLoader = require("../../../../../loader/shipment-loader");
var BuyerLoader = require("../../../../../loader/buyers-loader");
var ProductionOrderLoader = require("../../../../../loader/production-order-loader");


@inject(Router, Service)

export class List {

    info = {
        shipmentNumber: "",
        deliveryCode: "",
        productIdentity: "",
        buyerId: "",
        productionOrderId: "",
        dateFrom: "",
        dateTo: ""

    };

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    get shipmentLoader() {
        return ShipmentLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    searching() {

        if (this.filter) {
            this.info.shipmentNumber = this.filter.shipmentNumber ? this.filter.shipmentNumber.shipmentNumber : "";
            this.info.deliveryCode = this.filter.deliveryCode ? this.filter.deliveryCode.deliveryCode : "";
            this.info.productIdentity = this.filter.productIdentity ? this.filter.productIdentity.productIdentity : "";
            this.info.buyerId = this.filter.buyerId ? this.filter.buyerId._id : null;
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.orderNo : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then((result) => {
                this.no = 0;
                this.newData = [];

                for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < result.data[i].details.length; j++) {
                        for (var k = 0; k < result.data[i].details[j].items.length; k++) {
                            let item = result.data[i].details[j].items[k];

                            if (item.packingReceiptItems) {
                                for (let l = 0; l < item.packingReceiptItems.length; l++) {
                                    let tempData = {};
                                    this.no += 1;
                                    let packingReceiptItem = item.packingReceiptItems[l];

                                    tempData.no = this.no;
                                    tempData._createdDate = result.data[i]._createdDate;
                                    tempData.code = result.data[i].code;
                                    tempData.shipmentNumber = result.data[i].shipmentNumber;
                                    tempData.deliveryCode = result.data[i].deliveryCode;
                                    tempData.productIdentity = result.data[i].productIdentity;
                                    tempData.productionOrderNo = result.data[i].details[j].productionOrderNo;
                                    tempData.buyer = result.data[i].buyerName;
                                    tempData.productName = packingReceiptItem.productName;
                                    tempData.uomUnit = packingReceiptItem.uomUnit;
                                    tempData.quantity = packingReceiptItem.quantity;
                                    tempData.lengthTotal = (packingReceiptItem.quantity * packingReceiptItem.length).toFixed(2);
                                    tempData.weightTotal = (packingReceiptItem.quantity * packingReceiptItem.weight).toFixed(2);

                                    this.newData.push(tempData);
                                }
                            }
                            else {
                                let tempData = {};
                                this.no += 1;

                                tempData.no = this.no;
                                tempData._createdDate = result.data[i]._createdDate;
                                tempData.code = result.data[i].code;
                                tempData.shipmentNumber = result.data[i].shipmentNumber;
                                tempData.deliveryCode = result.data[i].deliveryCode;
                                tempData.productIdentity = result.data[i].productIdentity;
                                tempData.productionOrderNo = result.data[i].details[j].productionOrderNo;
                                tempData.buyer = result.data[i].buyerName;
                                tempData.productName = result.data[i].details[j].items[k].productName;
                                tempData.uomUnit = result.data[i].details[j].items[k].uomUnit;
                                tempData.quantity = result.data[i].details[j].items[k].quantity;
                                tempData.lengthTotal = (result.data[i].details[j].items[k].quantity * result.data[i].details[j].items[k].length).toFixed(2);
                                tempData.weightTotal = (result.data[i].details[j].items[k].quantity * result.data[i].details[j].items[k].weight).toFixed(2);

                                this.newData.push(tempData);
                            }
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
            this.info.shipmentNumber = this.filter.shipmentNumber ? this.filter.shipmentNumber.shipmentNumber : "";
            this.info.deliveryCode = this.filter.deliveryCode ? this.filter.deliveryCode.deliveryCode : "";
            this.info.productIdentity = this.filter.productIdentity ? this.filter.productIdentity.productIdentity : "";
            this.info.buyerId = this.filter.buyerId ? this.filter.buyerId._id : null;
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.orderNo : null;
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
