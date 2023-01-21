import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

const moment = require('moment');
const UnitLoader = require('../../../../../loader/unit-loader');
const FPRegradingResultDocLoader = require('../../../../../loader/fp-regrading-result-docs-loader');
const ProductLoader = require('../../../../../loader/product-loader');

@inject(Router, Service)
export class List {
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    };

    columns = [
        { field: "Code", title: "No. Bon Hasil Re-grading" },
        { field: "ProductName", title: "Nama Barang" },
        { field: "UnitName", title: "Unit" },
        {
            field: "_CreatedUtc", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "TotalQuantity", title: "Total Jumlah (Piece)", sortable: false },
        { field: "TotalLength", title: "Total Panjang (Meter)", sortable: false },
        {
            field: "IsReturn", title: "Status Retur", formatter: function (value, data, index) {
                return value ? "Ya" : "Tidak";
            }
        },
        {
            field: "IsReturnedToPurchasing", title: "Sudah Retur", formatter: function (value, data, index) {
                return data.IsReturn ? (value ? "Sudah" : "Belum") : "-";
            }
        },
        { field: "SupplierName", title: "Supplier" }
    ];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    };

    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.flag = false;
        this.unitQuery = { "division.name": "FINISHING & PRINTING" };
        this.returnStatusItems = ['', 'Ya', 'Tidak'];
        this.alreadyReturnItems = ['', 'Sudah', 'Belum'];
    }

    search() {
        this.flag = true;
        this.fpRegradingResultDocTable.refresh();
    }

    reset() {
        this.unit = undefined;
        this.doc = undefined;
        this.product = undefined;
        this.returnStatus = "";
        this.alreadyReturn = "";
        this.dateFrom = undefined;
        this.dateTo = undefined;

        this.flag = false;
        this.fpRegradingResultDocTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            unitName: this.unit ? this.unit.name : "",
            code: this.doc ? this.doc.Code : "",
            productName: this.product ? this.product.name : "",
            isReturn: this.returnStatus === "" ? null : (this.returnStatus === "Ya" ? true : false),
            isReturnedToPurchasing: this.alreadyReturn === "" ? null : (this.alreadyReturn === "Sudah" ? true : false),
            dateFrom: (!this.dateFrom || this.dateFrom == "Invalid Date") ? null : moment(this.dateFrom).format("MM/DD/YYYY"),
            dateTo: (!this.dateTo || this.dateTo == "Invalid Date") ? null : moment(this.dateTo).format("MM/DD/YYYY")
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    get unitLoader() {
        return UnitLoader;
    }

    get fpRegradingResultDocLoader() {
        return FPRegradingResultDocLoader;
    }

    get productLoader() {
        return ProductLoader;
    }
}