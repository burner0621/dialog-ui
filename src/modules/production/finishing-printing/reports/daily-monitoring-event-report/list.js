import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');
var MachineLoader = require("../../../../../loader/machines-loader");
var KanbanLoader = require("../../../../../loader/kanban-loader");

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    error = {};
    @bindable tableData = [];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    itemColumns = ["Design Speed", "Output", "Total Time", "Available Time", "Available Loading Time", "Loading Time", "Operating Time", "Value Operating Time", "Idle Time", "Asset Utilization", "OEE MMP", ""];
    areaOptions = ["", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;

    dateFrom = null;
    dateTo = null;
    machine = null;
    processArea = null;
    Machine = null;
    Kanban = null;
    filterKanban = null;
    kanbanId = null;

    bind(context) {
        this.context = context;
        this.data = context.data;
    }


    @bindable ItemsCollections;
    async searching() {
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY HH:mm") : null;
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY HH:mm") : null;
        var area = this.processArea;
        var machine = this.machine;

        var result = [];
        if (dateFrom && dateTo && area && machine && this.dateTo >= this.dateFrom) {
            this.error = {};

            result = await this.service.getReport(dateFrom, dateTo, area, machine);
        } else {
            if (!dateFrom) {
                this.error.dateFrom = "Tanggal Awal harus diisi";
            } else {
                this.error.dateFrom = null;
            }

            if (!dateTo) {
                this.error.dateTo = "Tanggal Akhir harus diisi";
            } else {
                if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
                    this.error.dateTo = "Tanggal Akhir harus lebih besar dari Tanggal Awal";
                } else {
                    this.error.dateTo = null;
                }
            }

            if (!area) {
                this.error.area = "Area harus diisi";
            } else {
                this.error.area = null;
            }

            if (!machine) {
                this.error.machine = "Mesin harus diisi";
            } else {
                this.error.machine = null;
            }

        }

        this.tableData = result;
        if (this.ItemsCollections) {
            this.ItemsCollections.bind();
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.machine = null;
        this.processArea = "";
        this.tableData = [];
        if (this.ItemsCollections) {
            this.ItemsCollections.bind();
        }
        this.error = {};
    }

    ExportToExcel() {
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY HH:mm") : null;
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY HH:mm") : null;
        var area = this.processArea;
        var machine = this.machine;

        if (dateFrom && dateTo && area && machine && this.dateTo >= this.dateFrom) {
            this.error = {};


            this.service.generateExcel(dateFrom, dateTo, area, machine);
        } else {
            if (!dateFrom) {
                this.error.dateFrom = "Tanggal Awal harus diisi";
            } else {
                this.error.dateFrom = null;
            }

            if (!dateTo) {
                this.error.dateTo = "Tanggal Akhir harus diisi";
            } else {
                if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
                    this.error.dateTo = "Tanggal Akhir harus lebih besar dari Tanggal Awal";
                } else {
                    this.error.dateTo = null;
                }
            }

            if (!area) {
                this.error.area = "Area harus diisi";
            } else {
                this.error.area = null;
            }

            if (!machine) {
                this.error.machine = "Mesin harus diisi";
            } else {
                this.error.machine = null;
            }

           
        }


    }

    get machineLoader() {
        return MachineLoader;
    }

}