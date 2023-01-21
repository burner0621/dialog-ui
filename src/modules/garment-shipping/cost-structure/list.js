import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Detail", "Cetak Pdf"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "comodity.name", title: "Nama Barang" },
        { field: "hsCode", title: "Kode HS" },
        { field: "destination", title: "Destination" },
        { field: "fabricType", title: "Jenis Fabric" },
        { field: "amount", title: "Amount" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: {}
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

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak Pdf":
                this.service.getPdfById(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
