import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { debug } from 'util';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian"];
    columns = [{
            field: "verifyDate",
            title: "Tanggal Cek",
            formatter: (value, data) => {

                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "dispositionNo", title: "No. Disposisi" },
        {
            field: "dispositionDate",
            title: "Tanggal Disposisi",
            formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "supplier.name", title: "Supplier" },
        {
            field: "position",
            title: "Status",
            formatter: (value, data) => {
                return (value == 6 ? "Not Verified" : "Verified");
            }
        },
        {
            field: "position",
            title: "Di Kirim Ke?",
            formatter: (value, data) => {
                return (value == 6 ? "Pembelian" : (value == 5 ? "Accounting" : "Keuangan"));
            }
        },
        {
            field: "payToSupplier",
            title: "Total Bayar ke Supplier",
            formatter: (value, data) => {
                return numeral(value).format('(0,0.00)');
            },
            align: 'right'
        },
        { field: "currency.code", title: "Currency" },
    ]

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ verificationFilter: "" }),
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data,
                }
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

}