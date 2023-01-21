import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "uPCNo", title: "No. Koreksi" },
        { field: "correctionDate", title: "Tgl Koreksi",
            formatter: (value, data) => {
                return moment(data.correctionDate).format("DD MMM YYYY");
            }
        },
        { field: "uPONo", title: "No. Surat Perintah Bayar" },
        { field: "supplier", title: "Supplier",
            formatter: (value, data) => {
                return data.supplier?data.supplier.code+" - "+data.supplier.name:"";
            } },
        { field: "invoiceCorrectionNo", title: "No. Invoice Koreksi" },
        { field: "dueDate", title: "Tgl Jatuh Tempo",
            formatter: (value, data) => {
                return moment(data.dueDate).format("DD MMM YYYY");
            }
        },
    ];

    context = ["Rincian", "Cetak PDF"];

    today = new Date();

    isPrint = false;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {

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
        };

        return this.service.search(arg)
            .then(result => {
                for (var _data of result.data) {
                    _data.Id= _data._id?_data._id:_data.Id;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    back() {
        this.router.navigateToRoute('list');
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }
}