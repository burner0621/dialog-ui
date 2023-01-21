import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var KanbanLoader = require("../../../../../loader/kanban-loader");
var FabricQcLoader = require("../../../../../loader/fabric-loader");

@inject(Router, Service)
export class List {


    info = {
        fabricQc: "",
        kanban: "",
        dateFrom: "",
        dateTo: "",

    };

    fabricQc = "";
    kanban = "";
    dateFrom = '';
    dateTo = '';
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        //this.data = this.context.data;
        this.error = this.context.error;

    }

    searching() {
        if (this.filter) {
            this.info.fabricQc = this.filter.fabricQc ? this.filter.fabricQc._id : "";
            this.info.kanban = this.filter.kanban ? this.filter.kanban.code : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                var tempData;
                this.no = 0;
                this.data = [];
                for (var i = 0; i < result.length; i++) {
                    for (var j = 0; j < result[i].items.length; j++) {
                        tempData = {};
                        this.no += 1;
                        tempData.no = this.no;
                        tempData.fabricQcCode = result[i].fabricQualityControlCode;
                        tempData.orderNo = result[i].productionOrderNo;
                        tempData.construction = result[i].construction;
                        tempData.colorRequest = result[i].color;
                        tempData.cartNumber = result[i].cartNo;
                        tempData.orderTypeName = result[i].productionOrderType;
                        tempData.date = result[i].date;
                        tempData.pcsNo = result[i].items[j].pcsNo;
                        tempData.grade = result[i].items[j].grade;
                        tempData.lot = result[i].items[j].lot;
                        tempData.status = result[i].items[j].status;
                        this.data.push(tempData);
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
            this.info.fabricQc = this.filter.fabricQc ? this.filter.fabricQc._id : "";
            this.info.kanban = this.filter.kanban ? this.filter.kanban.code : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    get fabricQcLoader() {
        return FabricQcLoader;
    }

    kanbanChanged(e) {
        console.log('kanban changed')
    }

    fabricQcChanged(e) {
        console.log('production number changed')
    }

    get filterKanban() {
        var temp = {};
        if (this.filter) {
            if (this.filter.productionOrder) {
                temp = {
                    "productionOrder.orderNo": this.filter.productionOrder.orderNo
                };
                return temp;
            } else
                return temp;
        } else
            return temp;
    }

    reset() {
        this.filter = {};
        this.data = [];
        // this.newData = [];
    }



}