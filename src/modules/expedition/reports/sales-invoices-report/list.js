import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
import numeral from 'numeral';

import { DialogDetailView } from './template/detail-dialog-view'

const BuyerLoader = require('./../../../../loader/buyers-loader');
const SalesInvoiceLoader = require('./../../../../loader/sales-invoice-loader');

import { Dialog } from './../../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class List {
    filterAccount = {};
    filter = {};
    listDataFlag = false;
    context = ["Rincian"]

    constructor(router, service, dialog) {
        this.service = service;
        this.router = router;
        this.dialog = dialog;
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        sortable: false,
        pagination: false
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    setValue() {
        this.arg.buyerId = this.selectedBuyer ? this.selectedBuyer.Id : null;
        this.arg.salesInvoiceId = this.selectedSalesInvoice ? this.selectedSalesInvoice.Id : null;
        this.arg.isPaidOff = this.selectedStatus ? this.selectedStatus.value : null;
        console.log(this.arg.isPaidOff)
        console.log(this.selectedStatus)
        console.log(this.selectedStatus.value)

        this.arg.dateFrom = this.startDate && this.startDate != "Invalid Date" ? moment(this.startDate).format("YYYY-MM-DD") : null;
        this.arg.dateTo = this.endDate && this.endDate != "Invalid Date" ? moment(this.endDate).format("YYYY-MM-DD") : null;
    }

    columns = [
        { field: "SalesInvoiceNo", title: "Nomor Faktur Jual" },
        { field: "Tempo", title: "Tempo (hari)" },
        {
            field: "TotalPayment",
            title: "Total Harga",
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '0';
            },
            align: 'right'
        },
        { field: "Unpaid", title: "Sisa Pembayaran" },
        {
            field: "TotalPaid",
            title: "Akumulasi",
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '0';
            },
            align: 'right'
        },
        { field: "Status", title: "Status" }
    ];

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.setValue(),
            this.service.getReport(this.arg)
            .then(result => {
                // var index = 0;
                return {
                    // total: result.info.total,
                    data: result.data,
                }
            })
        ) : { total: 0, data: {} };
    }

    reset() {
        this.selectedBuyer = null;
        this.selectedSalesInvoice = null;
        this.selectedStatus = this.statusTypes[0];
        this.startDate = null;
        this.endDate = null;
        this.listDataFlag = false;
        this.table.refresh();
    }

    search() {
        this.listDataFlag = true;
        // console.log(this);
        this.table.refresh();

        // this.setValue();
    }

    exportToExcel() {
        this.setValue();
        this.service.generateExcel(this.arg);
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        // console.log(data);
        switch (arg.name) {
            case "Rincian":
                // this.router.navigateToRoute('view', { id: data.orderNo });
                this.dialog.show(DialogDetailView, { data: data.SalesReceipts });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            default: return true;
        }
    }

    statusTypes = [{ value: true, label: "Lunas" }, { value: false, label: "Belum Lunas" }];

    get buyerLoader() {
        return BuyerLoader;
    }

    get salesInvoiceLoader() {
        return SalesInvoiceLoader;
    }
}