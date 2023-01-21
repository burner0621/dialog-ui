import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {

    selectedItem = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextMenu = ["Rincian", "Cetak PDF"];

    columns = [
        {
            field: "postedItem", checkbox: true, sortable: false,
            formatter: (value, data) => {
                return { disabled: data.IsPosted, }
            }
        },
        { field: "SONo", title: "Nomor Surat Jalan" },
        { field: "SODate", title: "Tanggal Surat Jalan", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "SupplierName", title: "Unit Pengirim" },
        {
            field: "TransferShippingOrderItems", title: "List Nomor DO",
            formatter: items => {
                items = items.map(item => "&#9679; " + item.DONo);
                return items.join("<br>");
            },
            sortable : false
        },
        { field: "IsPosted", title: "Status Post", formatter: value => { return value ? "SUDAH" : "BELUM" } },
    ];

    rowFormatter(data, index) {
        if (data.IsPosted) return { classes: "success" };
        return {};
    }

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
                for(var data of result.data) {
                    data.SupplierName = data.Supplier.name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.IsPosted;
            default:
                return true;
        }
    }
    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.pdf(data);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        var idPostItems = this.selectedItem.map(value => value.Id);
        if (idPostItems.length > 0) {
            this.service.post(idPostItems).then(result => {
                this.table.refresh();
                this.selectedItem = [];
            }).catch(e => {
                this.error = e;
            })
        }
    }
}