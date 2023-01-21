import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';
import numeral from 'numeral';

var DispositionLoader = require('../../../../loader/purchase-dispositions-all-loader');
var SupplierLoader = require('../../../../loader/supplier-loader');
var DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
    }
    filter = {
        Position: 6
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

    columns = [{
            field: "VerifyDate",
            title: "Tanggal Verifikasi",
            sortable: false,
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "DispositionNo", title: "No. Disposisi", sortable: false },
        {
            field: "DispositionDate",
            title: "Tanggal Disposisi",
            sortable: false,
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "CreatedUtc",
            title: "Tanggal Kirim dari Pembelian",
            sortable: false,
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierName", title: "Supplier", sortable: false },
        { field: "DivisionName", title: "Divisi", sortable: false },
        {
            field: "PayToSupplier",
            title: "Total Bayar",
            sortable: false,
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '-';
            },
            align: 'right'
        },
        { field: "Currency", title: "Mata Uang", sortable: false },
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
        this.disposition = null;
        this.supplier = null;
        this.division = null;
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
            no: this.disposition ? this.disposition.DispositionNo : "",
            supplier: this.supplier ? this.supplier.code : "",
            division: this.division ? this.division.Code : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",

        };

        return this.flag ?
            (
                this.service.search(args)
                .then(result => {
                    for (var a of result.data) {
                        a.PayToSupplier = a.PayToSupplier.toLocaleString();

                    }
                    return {
                        total: result.info.total,
                        data: result.data
                    };
                })
            ) : { total: 0, data: [] };
    }

    xls() {

        let args = {
            no: this.disposition ? this.disposition.DispositionNo : "",
            supplier: this.supplier ? this.supplier.code : "",
            division: this.division ? this.division.Code : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",

        };

        this.service.getXls(args);



    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get dispositionLoader() {
        return DispositionLoader;
    }

    dispositionView = (disposition) => {
        return `${disposition.DispositionNo}`;
    }

    divisionView = (division) => {
        return `${division.Name}`;
    }
}