import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');
var numeral = require('numeral');

var YarnsLoader = require('../../../../../loader/yarn-spinning-loader');
var UnitLoader = require('../../../../../loader/unit-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.title = "Laporan Output Produksi Winder";
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };

    listDataFlag = false;

    dateFrom = null;
    dateTo = null;

    columns = [
        [
            { field: "Unit", title: "Unit", rowspan: "2", valign: "top" },
            {
                field: "Date", title: "Tanggal", rowspan: "2", valign: "top", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            { title: "Shift I\n(bale)", colspan: "2", valign: "top" },
            { title: "Shift II\n(bale)", colspan: "2", valign: "top" },
            { title: "Shift III\n(bale)", colspan: "2", valign: "top" },
            { title: "Subtotal\n(bale)", colspan: "2", valign: "top" },
            {
                field: "Total", title: "Total\n(bale)", rowspan: "2", valign: "top", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            }
        ],
        [
            {
                field: "FirstShiftGood", title: "Good", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "FirstShiftBad", title: "Bad", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "SecondShiftGood", title: "Good", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "SecondShiftBad", title: "Bad", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "ThirdShiftGood", title: "Good", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "ThirdShiftBad", title: "Bad", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "SubtotalGood", title: "Good", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
            {
                field: "SubtotalBad", title: "Bad", valign: "middle", formatter: function (value, data, index) {
                    return numeral(value).format('0,000.00');
                }
            },
        ]
    ];

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    get yarnsLoader() {
        return YarnsLoader;
    }

    get spinningLoader() {
        return UnitLoader;
    }

    rowFormatter(data, index) {
        return {};
    }

    loader = (info) => {

        this.info = {};

        return this.listDataFlag ? (
            this.service.getReport(this.info)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.fillValues();
        this.listDataFlag = true;
        this.yarnOutputTable.refresh();
    }

    fillValues() {
        this.info.SpinningName = this.selectedSpinning ? this.selectedSpinning.name : "ALL";
        this.info.YarnName = this.selectedYarn ? this.selectedYarn.Name : "ALL";
        this.info.dateFrom = this.dateFrom ? this.dateFrom : "";
        this.info.dateTo = this.dateTo ? this.dateTo : "";
    }

    reset() {
        this.listDataFlag = false;
        this.dateFrom = "";
        this.dateTo = "";
        this.selectedSpinning = null;
        this.selectedYarn = null;
        this.info = {};
        this.yarnOutputTable.refresh();
    }

    exportExcel() {
        this.fillValues();
        this.service.generateExcel(this.info);
    }
}