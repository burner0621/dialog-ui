import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import numeral from 'numeral';
import moment from 'moment';

var MachineLoader = require('../../../../../loader/machine-loader');

@inject(Router, Service)
export class List {
    filter = {};
    orderTypeList = ["", "WHITE", "DYEING", "PRINTING", "YARN DYED"];

    columns = [
        [{ title: "Belum Produksi", colspan: 4 }, { title: "Deadline Kanban", colspan: 12 }],
        [
            { field: "no", title: "No.", formatter: function (value, data, index) { return value === "" ? value : index + 1; } },
            { field: "orderType", title: "Jenis Order" },
            { field: "machine", title: "Mesin" },
            { field: "total", title: "Jumlah (M)", formatter: this.numberFormatter },
            { field: "Jan", title: "Januari", formatter: this.numberFormatter },
            { field: "Feb", title: "Februari", formatter: this.numberFormatter },
            { field: "Mar", title: "Maret", formatter: this.numberFormatter },
            { field: "Apr", title: "April", formatter: this.numberFormatter },
            { field: "Mei", title: "Mei", formatter: this.numberFormatter },
            { field: "Jun", title: "Juni", formatter: this.numberFormatter },
            { field: "Jul", title: "Juli", formatter: this.numberFormatter },
            { field: "Ags", title: "Agustus", formatter: this.numberFormatter },
            { field: "Sep", title: "September", formatter: this.numberFormatter },
            { field: "Okt", title: "Oktober", formatter: this.numberFormatter },
            { field: "Nov", title: "November", formatter: this.numberFormatter },
            { field: "Des", title: "Desember", formatter: this.numberFormatter }
        ]
    ];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    };

    machines = [];
    data = [];
    yearList = [];

    constructor(router, service, serviceCore) {
        this.router = router;
        this.service = service;
        this.serviceCore = serviceCore;

        this.year = moment().format('YYYY');
        for (var i = parseInt(this.year) + 1; i > 2010; i--) {
            this.yearList.push(i.toString());
        }
    }

    search() {
        this.data = [];

        let info = {
            orderType: this.orderType,
            machine: this.machine ? this.machine.name : undefined,
            year: this.year
        };

        this.service.search(info)
            .then((results) => {
                for (let d of results.data) {
                    this.data.push(d);
                }

                if (this.data.length > 0) {
                    this.data.push({
                        no: "", machine: "Total", orderType: "", total: this.sum("total"),
                        Jan: this.sum("Jan"), Feb: this.sum("Feb"), Mar: this.sum("Mar"), Apr: this.sum("Apr"),
                        Mei: this.sum("Mei"), Jun: this.sum("Jun"), Jul: this.sum("Jul"), Ags: this.sum("Ags"),
                        Sep: this.sum("Sep"), Okt: this.sum("Okt"), Nov: this.sum("Nov"), Des: this.sum("Des")
                    });
                }

                this.machineQueueTable.refresh();
            });
    }

    numberFormatter(value, data, index) {
        if (value > 0)
            return numeral(value).format('0,000.00');

        return value;
    }

    sum(field) {
        let sum = 0;

        for (let d of this.data) {
            sum += d[field];
        }

        if (sum > 0)
            return numeral(sum).format('0,000.00');

        return sum;
    }

    excel() {
        let info = {
            orderType: this.orderType,
            machine: this.machine ? this.machine.name : undefined,
            year: this.year
        };

        this.service.generateExcel(info);
    }

    reset() {
        this.data.length = 0;
        this.orderType = "";
        this.year = moment().format("YYYY");
        this.machine = undefined;
        this.machineQueueTable.refresh();
    }

    get machineLoader() {
        return MachineLoader;
    }
}