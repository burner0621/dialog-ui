import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail"]

    columns = [
        { field: "Code", title: "Kode Penerimaan Packing" },
        { field: "PackingCode", title: "Kode Packing" },
        { field: "Storage.name", title: "Nama Gudang" },
        {
            field: "Date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Buyer", title: "Buyer" },
        { field: "ProductionOrderNo", title: "Nomor Production Order" },
        { field: "ColorName", title: "Warna" },
        { field: "Construction", title: "Konstruksi" },
        { field: "CreatedBy", title: "Diterima Oleh" }
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

        return this.service.searchUnvoid(arg)
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}