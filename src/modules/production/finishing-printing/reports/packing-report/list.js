import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var PackingLoader = require('../../../../../loader/packing-loader');
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

@inject(Router, Service)
export class List {


    info = {
        code: "",
        productionOrderNo: "",
        dateFrom: "",
        dateTo: "",

    };
    code = {};
    productionOrderNo = {};
    dateFrom = "";
    dateTo = "";

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    searching() {
        
        if (this.filter) {
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.Id : null;
            this.info.code = this.filter.code ? this.filter.code.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                
                var tempData;
                this.no = 0;
                this.newData = [];

                for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < result.data[i].PackingDetails.length; j++) {
                        tempData = {};
                        this.no += 1;
                        tempData.no = this.no;
                        tempData.code = result.data[i].Code;
                        tempData.deliveryType = result.data[i].DeliveryType;
                        tempData.construction = result.data[i].Construction;
                        tempData.buyerName = result.data[i].BuyerName;
                        tempData.productionOrderNo = result.data[i].ProductionOrderNo;
                        tempData.orderType = result.data[i].OrderTypeName;
                        tempData.finishedProductType = result.data[i].FinishedProductType;
                        tempData.construction = result.data[i].Construction;
                        tempData.designCode = result.data[i].DesignCode;
                        tempData.colorName = result.data[i].ColorName;
                        tempData.date = result.data[i].Date;

                        tempData.lot = result.data[i].PackingDetails[j].Lot;
                        tempData.grade = result.data[i].PackingDetails[j].Grade;
                        tempData.weight = result.data[i].PackingDetails[j].Weight;
                        tempData.length = result.data[i].PackingDetails[j].Length;
                        tempData.quantity = result.data[i].PackingDetails[j].Quantity;
                        tempData.total = (result.data[i].PackingDetails[j].Length)*(result.data[i].PackingDetails[j].Quantity);
                        tempData.remark = result.data[i].PackingDetails[j].Remark;
                        this.newData.push(tempData);
                    }
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.Id : null;
            this.info.code = this.filter.code ? this.filter.code.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    get packingLoader() {
        return PackingLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    reset() {
        this.filter = {};
        this.data = [];
    }

}