import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var SPBLoader = require('../../../../loader/purchasing-document-expedition-loader');
var SupplierLoader = require('../../../../loader/supplier-loader');
var DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
    }
    filter={
        Position:6
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "VerifyDate", title: "Tanggal Verifikasi", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "UnitPaymentOrderNo", title: "No. SPB" , sortable: false },
        { field: "UPODate", title: "Tanggal SPB", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierName", title: "Supplier", sortable: false },
        { field: "DivisionName", title: "Divisi", sortable: false },
        { field: "TotalPaid", title: "Total Bayar", sortable: false },
        { field: "Currency", title: "Mata Uang" , sortable: false},
        { field: "NotVerifiedReason", title: "Alasan", sortable: false },
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.trTable.refresh();
        }
    }

    reset() {
        this.unit = undefined;
        this.status = "";
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        this.trTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            no: this.spb ? this.spb.UnitPaymentOrderNo : "",
            supplier: this.supplier ? this.supplier.code : "",
            division: this.division?this.division.code : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        for(var a of result.data){
                            if(a.isCanceled){
                                a.status="Dibatalkan";
                            }
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    // xls() {
    //     this.error = {};

    //     if (Object.getOwnPropertyNames(this.error).length === 0) {
    //         let args = {
    //         no: this.spb ? this.spb.UnitPaymentOrderNo : "",
    //         supplier: this.supplier ? this.supplier.code : "",
    //         division: this.division?this.division.code : "",
    //         dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
    //         dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

    //     };

    //         this.service.getXls(args)
    //             .catch(e => {
    //                 alert(e.replace(e, "Error: ", ""));
    //             });
    //     }
    // }

    get divisionLoader(){
        return DivisionLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get spbLoader() {
        return SPBLoader;
    }

    spbView = (spb) => {
      return `${spb.UnitPaymentOrderNo}`;
    }

    divisionView = (division) => {
      return `${division.name}`;
    }
}
