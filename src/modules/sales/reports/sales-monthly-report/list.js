import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    orderType = null;
    account = null;
    filterAccount = {};
    filter = {};
    info = { page: 1, keyword: '' };

    activate() {
        this.data = [];
        this.filterAccount = {
            "roles": {
                "$elemMatch": {
                    "permissions": {
                        "$elemMatch": {
                            "unit.name": "PENJUALAN FINISHING & PRINTING"
                        }
                    }
                }
            }
        };
    }
    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.orderType = null;
        this.account = null;
        this.filter = {};
        this.info = { page: 1, keyword: '' };
        this.data = [];
    }

    searching() {
        var data = [];
        this.setFilter();
        this.service.getSalesMonthlyReport(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
            })
    }

    ExportToExcel() {
        this.setFilter();
        this.service.generateExcel(this.info);
    }


    orderTypeChanged(e) {
        var selectedOrderType = e.detail || null;
        if (selectedOrderType) {
            this.filterOrder = {
                "orderType.code": selectedOrderType.code
            }
        } else {
            this.orderType = null;
            this.processType = null;
            this.filterOrder = {};
        }
    }

    accountChanged(e) {
        var selectedAccount = e.detail || null;
        if (!selectedAccount) {
            this.account = null;
        }
    }

    setFilter() {
        this.info.filter = {};
        if (this.dateFrom) {
            Object.assign(this.filter, { sdate: this.dateFrom });
        }
        if (this.dateTo) {
            Object.assign(this.filter, { edate: this.dateTo });
        }
        if (this.orderType) {
            Object.assign(this.filter, { orderTypeId: this.orderType._id });
        }
        if (this.account) {
            Object.assign(this.filter, { accountId: this.account._id });
        }
        if (Object.getOwnPropertyNames(this.filter).length > 0) {
            this.info.filter = JSON.stringify(this.filter);
        }
    }
}
