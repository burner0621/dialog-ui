import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    dataToBePosted = [];

    context = ["Detail", "Cetak"]

    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.isPosted;
                return ""
            }
        },
        { field: "invoiceNo", title: "No Invoice" },
        {
            field: "date", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "packingListType", title: "Jenis Packing List" },
        { field: "invoiceType", title: "Jenis Invoice" },
        {
            field: "status", title: "Status", formatter: value => {
                if (value == "CREATED") {
                    return "ON PROCESS";
                } if (value == "REJECTED_SHIPPING_MD") {
                    return "APPROVED MD";
                } if (value == "REJECTED_SHIPPING_UNIT") {
                    return "REJECTED SHIPPING";
                } else {
                    return value.replaceAll("_", " ");
                }
            }
        },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    rowFormatter(data, index) {
        switch (data.status) {
            case "CANCELED":
                return { css: { "background": "#eeeeee" } }
            case "APPROVED_MD":
            case "REJECTED_SHIPPING_MD":
                return { classes: "warning" }
            case "APPROVED_SHIPPING":
                return { classes: "success" }
            case "REJECTED_MD":
            case "REJECTED_SHIPPING_UNIT":
                return { classes: "danger" }
            case "REVISED_MD":
            case "REVISED_SHIPPING":
                return { classes: "info" }
            case "CREATED":
            case "POSTED":
            default:
                return { css: { "background": "white" } }
        }
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak":
                this.service.getPdfById(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        if (this.dataToBePosted.length > 0) {
            this.service.post(this.dataToBePosted.map(d => d.id))
                .then(result => {
                    this.table.refresh();
                }).catch(e => {
                    this.error = e;
                })
        }
    }
}
