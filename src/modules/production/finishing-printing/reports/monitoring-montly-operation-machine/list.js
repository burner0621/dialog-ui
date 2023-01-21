import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

var machineLoader = require('../../../../../loader/machine-loader');
var Unit = require('../../../../../loader/unit-loader');


@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
    }

    Values() {

        this.arg = {
            page: 1,
            size: Number.MAX_SAFE_INTEGER,
            select: ["machine.name", "input", "machine.monthlyCapacity", "machine.code", "dateInput"],
        };

        this.arg.filter = JSON.stringify({
            "machineCode": this.machine.code,
            "type": "input",
            "dateFrom": new Date(this.dateFrom),
            "dateTo": new Date(this.dateTo),
        });
    }

    filter = {};
    listDataFlag = false;

    columns = [
        { field: "name", title: "Nama Mesin" },
        { field: "capacity", title: "Kapasitas", align: "right" },
        { field: "monthlyCapacity", title: "Input", align: "right" },
        { field: "date", title: "Periode", align: "right" },
    ]

    loader = (info) => {
        // var order = {};

        // if (info.sort)
        //     order[info.sort] = info.order;


        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg).then((result) => {
                var data;
                if (result.info.length == 0) {
                    data = {};
                } else {
                    var sum = 0;
                    for (var i of result.info) {
                        sum += i.input;
                    }

                    data = [{
                        name: result.info[0].machine.name,
                        capacity: numeral(parseFloat(result.info[0].machine.monthlyCapacity.toFixed(2))).format('0,000.00'),
                        monthlyCapacity: numeral(parseFloat(sum.toFixed(2))).format('0,000.00'),
                        date: moment(this.dateFrom).format("DD-MMM-YYYY") + " hingga " + moment(this.dateTo).format("DD-MMM-YYYY"),
                    }];

                }
                return {
                    total: result.info.total,
                    data: data
                }
            })
        ) : { total: 0, data: {} };
    }

    ExportToExcel() {
        this.Values();
        this.service.generateExcel(this.arg);
    }

    search() {
        var e = {};
        if (!this.machine) {
            e.machine = "machine harus di isi";
            this.error = e;
        }

        if (!this.dateFrom) {
            e.dateFrom = "tanggal awal harus di isi";
            this.error = e;
        }

        if (!this.dateTo) {
            e.dateTo = "tanggal akhir harus di isi";
            this.error = e;
        }

        if (Object.getOwnPropertyNames(e) == 0) {

            this.listDataFlag = true;
            this.table.refresh();
        }

    }

    get MachineLoader() {
        return machineLoader;
    }

    get unitLoader() {
        return Unit;
    }

    reset() {
        this.machine = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.table.refresh();
    }

}