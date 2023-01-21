import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.year = moment().format('YYYY');
        for (var i = parseInt(this.year) + 1; i > 2010; i--) {
            this.yearList.push(i.toString());
        }

        this.title = "Laporan Status Order Berdasarkan Delivery";
        this.contextTable = ["Detail"];
    }

    info = {};

    data = [];


    yearList = [];
    orderTypeList = ["", "WHITE", "DYEING", "PRINTING", "YARN DYED"];

    listDataFlag = false;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    columns = [
        [
            { title: "Status Order", colspan: "10" },
        ],
        [
            { field: "name", title: "Bulan" },
            { field: "orderQuantity", title: "Target Kirim Ke Buyer\n(m)", align: "right" },
            { field: "diffOrderKanbanQuantity", title: "Sisa Belum Turun Kanban\n(m)", align: "right" },
            { field: "preProductionQuantity", title: "Belum Produksi\n(m)", align: "right" },
            { field: "onProductionQuantity", title: "Sedang Produksi\n(m)", align: "right" },
            { field: "inspectingQuantity", title: "Sedang QC\n(m)", align: "right" },
            { field: "afterProductionQuantity", title: "Sudah Produksi\n(m)", align: "right" },
            { field: "storageQuantity", title: "Sudah Dikirim Ke Gudang\n(m)", align: "right" },
            { field: "shipmentQuantity", title: "Sudah Dikirim Ke Buyer\n(m)", align: "right" },
            { field: "diffOrderShipmentQuantity", title: "Sisa Belum Kirim Ke Buyer\n(m)", align: "right" }
        ]
    ];

    rowFormatter(data, index) {
        if (index === 12) {
            return { classes: "weight" }
        } else {
            return {};
        }
    }

    loader = (info) => {

        this.info = {};

        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.info)
                .then((result) => {
                    for (let data of result.data) {
                        data.onProductionQuantity = numeral(data.onProductionQuantity).format('0,000.00');
                        data.inspectingQuantity = numeral(data.inspectingQuantity).format('0,000.00');
                        data.orderQuantity = numeral(data.orderQuantity).format('0,000.00');
                        data.preProductionQuantity = numeral(data.preProductionQuantity).format('0,000.00');
                        data.afterProductionQuantity = numeral(data.afterProductionQuantity).format('0,000.00');
                        data.shipmentQuantity = numeral(data.shipmentQuantity).format('0,000.00');
                        data.storageQuantity = numeral(data.storageQuantity).format('0,000.00');
                        data.diffOrderKanbanQuantity = numeral(data.diffOrderKanbanQuantity).format('0,000.00');
                        data.diffOrderShipmentQuantity = numeral(data.diffOrderShipmentQuantity).format('0,000.00');
                    }

                    this.selectedYear = this.year;
                    this.selectedOrderType = this.orderType;

                    return {
                        data: result.data
                    }
                })
        ) : { total: 0, data: {} };
    }

    fillValues() {
        this.info.orderType = this.orderType ? this.orderType : "";
        this.info.year = this.year ? this.year : moment().format('YYYY');
    }

    searching() {
        this.listDataFlag = true;
        this.orderStatusTable.refresh();
    }

    exportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.info);
    }

    reset() {
        this.listDataFlag = false;
        this.info = {};
        this.year = moment().format("YYYY");
        this.orderStatusTable.refresh();
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                if (data.name != "Total")
                    window.open(`${window.location.origin}/#/production/finishing-printing/reports/order-status-report/view/${this.selectedYear}/${data.name}/${this.selectedOrderType}`);
                break;
        }
    }
}