import { inject, bindable } from 'aurelia-framework';
import { Service, CoreService } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');
var MaterialTypeLoader = require('../../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../../loader/unit-loader');
var MachineNoLoader = require('../../../../../loader/machine-spinning-distinct-no-loader');
var MachineNameLoader = require('../../../../../loader/machine-spinning-distinct-name-loader');

@inject(Router, Service, CoreService)
export class List {

    @bindable dateFrom;
    @bindable dateTo;
    @bindable production;
    @bindable unit;
    @bindable processType;
    @bindable machineName;
    @bindable machineNo;
    @bindable materialType;
    @bindable columns;

    constructor(router, service, coreService) {

        this.service = service;
        this.coreService = coreService;
        this.router = router;
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;

    spinningFilter = { "DivisionName.toUpper()": "SPINNING" };


    outputColumns = [

        {
            field: "no", title: "No", formatter: function (value, data, index) {
                return index + 1;
            }
        },
        {
            field: "Date", title: "Tanggal", valign: "top", formatter: function (value, data, index) {
                return value ? moment(value).format("DD/MM/YYYY") : "-";
            }
        },
        { field: "UnitDepartment.Name", title: "Unit", valign: "top" },
        { field: "ProcessType", title: "Jenis Proses", valign: "top" },
        { field: "MachineSpinning.No", title: "Nomor Mesin", valign: "top" },
        { field: "MachineSpinning.Name", title: "Merk Mesin", valign: "top" },
        { field: "MaterialType.Name", title: "Jenis Benang", valign: "top" },
        { field: "Total", title: "Counter", valign: "top" },
        { field: "MachineSpinning.UomUnit", title: "UOM", valign: "top" },
        { field: "Bale", title: "Bale", valign: "top" }
    ];

    inputColumns = [

        {
            field: "no", title: "No", formatter: function (value, data, index) {
                return index + 1;
            }
        },
        {
            field: "Date", title: "Tanggal", valign: "top", formatter: function (value, data, index) {
                return value ? moment(value).format("DD/MM/YYYY") : "-";
            }
        },
        { field: "UnitDepartment.Name", title: "Unit", valign: "top" },
        { field: "ProcessType", title: "Jenis Proses", valign: "top" },
        { field: "MachineSpinning.No", title: "Nomor Mesin", valign: "top" },
        { field: "MachineSpinning.Name", title: "Merk Mesin", valign: "top" },
        { field: "MaterialType.Name", title: "Jenis Benang", valign: "top" },
        { field: "Total", title: "Counter", valign: "top" },
        { field: "MachineSpinning.UomUnit", title: "UOM", valign: "top" }
    ];


    allColumns = [

        {
            field: "no", title: "No", formatter: function (value, data, index) {
                return index + 1;
            }
        },
        {
            field: "Date", title: "Tanggal", valign: "top", formatter: function (value, data, index) {
                return value ? moment(value).format("DD/MM/YYYY") : "-";
            }
        },
        { field: "UnitDepartment.Name", title: "Unit", valign: "top" },
        { field: "ProcessType", title: "Jenis Proses", valign: "top" },
        { field: "MachineSpinning.No", title: "Nomor Mesin", valign: "top" },
        { field: "MachineSpinning.Name", title: "Merk Mesin", valign: "top" },
        { field: "MaterialType.Name", title: "Jenis Benang", valign: "top" },
        { field: "Total", title: "Counter", valign: "top" },
        { field: "MachineSpinning.UomUnit", title: "UOM", valign: "top" },
        { field: "Remark", title: "Keterangan", valign: "top", show: "false" }
    ];



    typeOptions = [];
    prodOptions = [];
    bind(context) {
        this.context = context;
        this.prodOptions = ["ALL", "INPUT", "OUTPUT"];
        this.data = context.data;
        this.coreService.getMachineTypes()
            .then(result => {
                if (this.processType) {
                    this.typeOptions = result;
                } else {
                    this.typeOptions.push("");
                    for (var list of result) {
                        this.typeOptions.push(list);
                    }
                }
            });
        this.columns = this.allColumns;
    }


    allLoader = (info) => {

        this.info = {};
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY") : null
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY") : null
        // var prodNumber = this.production == "INPUT" ? 1 : this.production == "OUTPUT" ? 2 : 0;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(dateFrom, dateTo, 0, this.unit, this.processType,
                this.machineNo, this.machineName, this.materialType)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    inputLoader = (info) => {

        this.info = {};
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY") : null
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY") : null
        // var prodNumber = this.production == "INPUT" ? 1 : this.production == "OUTPUT" ? 2 : 0;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(dateFrom, dateTo, 1, this.unit, this.processType,
                this.machineNo, this.machineName, this.materialType)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    outputLoader = (info) => {

        this.info = {};
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY") : null
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY") : null
        // var prodNumber = this.production == "INPUT" ? 1 : this.production == "OUTPUT" ? 2 : 0;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(dateFrom, dateTo, 2, this.unit, this.processType,
                this.machineNo, this.machineName, this.materialType)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {

        this.listDataFlag = true;
        if (this.production == 'INPUT') {
            this.inputTable.refresh();
        } else if (this.production == 'OUTPUT') {
            this.outputTable.refresh();
        } else {
            this.allTable.refresh();
        }
    }

    productionChanged(n, o) {
        if (this.production) {
            this.listDataFlag = false;
            this.allTable.refresh();
            this.inputTable.refresh();
            this.outputTable.refresh();
            this.error = '';
        }
    }

    reset() {
        this.listDataFlag = false;
        this.dateFrom = null;
        this.dateTo = null;
        this.production = 'ALL';
        this.unit = null;
        this.processType = '';
        this.machineNo = null;
        this.machineName = null;
        this.materialType = null;
        this.allTable.refresh();
        this.inputTable.refresh();
        this.outputTable.refresh();
        this.error = '';
    }

    ExportToExcel() {
        var prodNumber = this.production == "INPUT" ? 1 : this.production == "OUTPUT" ? 2 : 0;
        var dateFrom = this.dateFrom ? moment(this.dateFrom).format("DD MMM YYYY HH:mm") : null
        var dateTo = this.dateTo ? moment(this.dateTo).format("DD MMM YYYY HH:mm") : null

        this.service.generateExcel(dateFrom, dateTo, prodNumber, this.unit, this.processType,
            this.machineNo, this.machineName, this.materialType);
    }

    get machineNoLoader() {
        return MachineNoLoader;
    }

    get machineNameLoader() {
        return MachineNameLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

}