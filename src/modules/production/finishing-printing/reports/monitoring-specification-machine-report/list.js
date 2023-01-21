import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var MachineLoader = require('../../../../../loader/machines-loader');
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

@inject(Router, Service)
export class List {

    get machineLoader() {
        return MachineLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    info = {
        machineId: "",
        productionOrderNumber: '',
        dateFrom: "",
        dateTo: "",
        page:1,
        size:25,
    };

    machine = null;
    productionOrder = null;
    dateFrom = null;
    dateTo = null;

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    searching() {
         this.error = {};

        if (!this.machine )
            this.error.machine = "Mesin harus diisi";
        
        
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.info.machineId = this.machine.Id;
            this.info.productionOrderNo = this.productionOrder?this.productionOrder.OrderNo : "";
            this.info.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
            this.service.search(this.info)
                .then(result => {
                    this.data = result.data;
                })
        }
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        this.error = {};
        if (!this.machine)
            this.error.machine = "Mesin harus diisi";
        
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.info.machineId = this.machine.Id;
            this.info.productionOrderNo = this.productionOrder?this.productionOrder.OrderNo : "";
            this.info.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
            this.service.generateExcel(this.info);
        }
    }

    reset() {
        this.info.machineId = '';
        this.info.productionOrderNumber = '';
        this.info.dateFrom = '';
        this.info.dateTo = '';

        this.machine = null;
        this.productionOrder = null;
        this.dateFrom = null;
        this.dateTo = null;
    }

}