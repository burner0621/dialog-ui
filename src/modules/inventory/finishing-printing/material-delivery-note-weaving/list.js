import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak Bon Pengiriman"];
    columns = [
        { field: "code", title: "Kode BON" },
        {
            field: "DateSJ", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "buyer.name", title: "Nama Buyer" },
        { field: "sendTo", title: "Dibuat Oleh" }
    ];

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        else
            order["DateSJ"] = "desc";

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    // total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;

        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak Bon Pengiriman":
                this.service.getPdfById(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
