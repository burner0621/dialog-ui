import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail"]

    columns = [
        { field: "vbNo", title: "Nomor VB" },
        {
            field: "vbDate", title: "Tanggal VB", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ForwarderName", title: "Forwarder" },
        { field: "forwarderInvoiceNo", title: "No Invoice Forwarder" },
        { field: "EMKLName", title: "EMKL" },
        { field: "emklInvoiceNo", title: "No Invoice EMKL" },
        {
            field: "paymentDate", title: "Tanggal Pembayaran", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        }
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
                for (const data of result.data) {
                    data.ForwarderName = data.forwarder.name;
                    data.EMKLName = data.emkl.name;
                }
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
        console.log(data)
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
