import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }

    context = ["detail"/*,"cetak PDF"*/]

    columns = [
        { field: "Code", title: "Nomor Retur" },
        {
            field: "Date", title: "Tanggal Retur", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Destination", title: "Yang Menerima" },
        { field: "Buyer.Name", title: "Terima Dari" },
        { field: "SpkNo", title: "SPK" },
        { field: "CoverLetter", title: "No. Surat Pengantar" }
    ];

    loader = (info) => {
        var order = {};
        var filter = {
            IsVoid: false
        }
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            filter: JSON.stringify(filter),
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

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "view":
                return true;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}