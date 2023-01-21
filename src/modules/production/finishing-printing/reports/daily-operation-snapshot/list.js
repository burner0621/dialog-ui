import { inject } from 'aurelia-framework';
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
        let dateNow = new Date();
        this.monthNow = dateNow.getMonth();
        this.month = this.monthList[this.monthNow];

        this.yearNow = dateNow.getFullYear();
        this.year = this.yearNow;
        for (var i = this.yearNow - 4; i <= this.yearNow; i++) {
            this.yearList.push(i);
        }
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    monthList = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    yearList = [];
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;

    searchDate = null;
    Machine = null;
    Kanban = null;
    filterKanban = null;
    kanbanId = null;
    month = "";
    year = 0;

    columns = [
        [
            {
                field: "no", title: "No", rowspan: "3", valign: "top", formatter: function (value, data, index) {
                    return index + 1;
                }
            },
            { field: "Kanban.ProductionOrder.OrderNo", title: "No. Order", rowspan: "3", valign: "top" },
            { field: "Kanban.Cart.CartNumber", title: "No. Kereta", rowspan: "3", valign: "top" },
            { field: "Kanban.IsReprocess", title: "Reproses", rowspan: "3", valign: "top" },
            { field: "Machine.Name", title: "Mesin", rowspan: "3", valign: "top" },
            { field: "Step.Process", title: "Step Proses", rowspan: "3", valign: "top" },
            { field: "Kanban.ProductionOrder.Material.Name", title: "Material", rowspan: "3", valign: "top" },
            { field: "Kanban.SelectedProductionOrderDetail.ColorRequest", title: "Warna", rowspan: "3", valign: "top" },
            { field: "Kanban.ProductionOrder.FinishWidth", title: "Lebar Kain (inch)", rowspan: "3", valign: "top" },
            { field: "Kanban.ProductionOrder.ProcessType.Name", title: "Jenis Proses", rowspan: "3", valign: "top" },
            { title: "Panjang In (m)", colspan: "3", valign: "middle" },
            { title: "Panjang Out (m)", colspan: "4", valign: "middle" },
            { field: "BadOutputDescription", title: "Keterangan BS", rowspan: "3", valign: "middle", classes: "newLine" },
        ],
        [
            {
                field: "DateInput", title: "Tgl", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {
                field: "TimeInput", title: "Jam", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format('HH:mm') : '-';
                }
            },
            { field: "Input", title: "In Qty", rowspan: "2", valign: "middle", },
            {
                field: "DateOutput", title: "Tgl", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {
                field: "TimeOutput", title: "Jam", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format('HH:mm') : '-';
                }
            },
            { title: "Out Qty", colspan: "2", valign: "middle" },
        ],
        [
            { field: "GoodOutput", title: "BQ", valign: "middle" },
            { field: "BadOutput", title: "BS", valign: "middle" },
        ]
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

        this.info = {};
        var searchDate = this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(searchDate)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;

        this.dailyTable.refresh();
    }


    reset() {
        this.listDataFlag = false;
        this.dateFrom = null;
        this.dateTo = null;
        this.Machine = null;
        this.Kanban = null;
        this.filterKanban = null;
        this.kanbanId = null;
        this.error = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        // var searchDate = this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null;
        let currMonth = this.monthList.indexOf(this.month) + 1;
        this.service.generateExcel(currMonth, this.year);
    }

    get machineLoader() {
        return MachineLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

}