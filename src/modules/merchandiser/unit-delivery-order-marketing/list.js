import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Rincian"]
    options = {};
    columns = [

        { field: "UnitDONo", title: "No. Delivery Order" },
        {
            field: "UnitDODate", title: "Tanggal DeliveryOrder", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "UnitSenderName", title: "Unit Yang Mengirim" },
        { field: "StorageName", title: "Gudang Yang Mengirim" },
        { field: "CreatedBy", title: "User" },
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
            filter: JSON.stringify({UnitDOType:"MARKETING"})
        }

        return this.service.search(arg)
            .then(result => {
                var data = {};
                data.total = result.info.total;
                data.data = result.data;
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
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.IsPosted;
            default:
                return true;
        }
    }

    attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
    }

    create() {
        this.router.navigateToRoute('create');
    }
}