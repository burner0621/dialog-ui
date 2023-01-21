import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import UnitLoader from "../../../loader/unit-loader";
var moment = require('moment');
@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;

    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;
    date = null;
    shift = null;
    unit = null;
    shifts = ["", "PAGI", "SIANG"];

    columns = [
        { field: "material", title: "Material" },
        { field: "prodcutionOrderNo", title: "No. SPP" },
        { field: "startSum", title: "Sum. Of AWAL" },
        { field: "inSum", title: "Sum. Of MASUK" },
        { field: "outSum", title: "Sum. Of KELUAR" },
        { field: "endSum", title: "Sum. Of AKHIR" },
    ];

    // activate() {
    // }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    // searching() {
    //     this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
    //         .then(result => {
    //             this.data = result;
    //             for (var daily of this.data) {
    //                 daily.timeInput = daily.dateInput ? moment(daily.timeInput).format('HH:mm') : '-';
    //                 daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
    //             }
    //         })
    // }

    rowFormatter(data, index) {
        // if (index === 12) {
        //     return { classes: "weight" }
        // } else {
        //     return {};
        // }
        return {};
    }

    loader = (info) => {
        //hapus klo dah fix backend
        this.listDataFlag = false;

        this.info = {};
        var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(searchDate, this.zone, this.group, this.mutation)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;

        this.table.refresh();
    }


    reset() {
        this.listDataFlag = false;
        this.date = null;
        this.shift = null;
        this.unit = null;
        this.error = '';
    }

    ExportToExcel() {

        var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;

        //uncommment klo dah fix backend
        // this.service.generateExcel(searchDate, this.zone, this.group, this.mutation);
    }

    unitQuery = { "DivisionName.toUpper()": "DYEING & PRINTING" };
    get unitLoader() {
        return UnitLoader;
    }
}