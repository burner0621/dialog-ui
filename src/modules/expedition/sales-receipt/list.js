import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

@inject(Router, Service)
export class List {
    context = ["Detail", "Cetak Kuitansi"];

    columns = [
        { field: "SalesReceiptNo", title: "No. Kuitansi" },
        {
            field: "Buyer.Name",
            title: "Buyer",
        },
        {
            field: "SalesReceiptDate",
            title: "Tgl Pembayaran",
            formatter: (value, data, index) => {
                return moment.utc(value).local().format("DD MMM YYYY");
            },
        },
        {
            field: "OriginAccountNumber",
            title: "Rek. Bank Asal",
        },
        {
            field: "Currency.Code",
            title: "Kurs",
        },
        {
            field: "TotalPaid",
            title: "Jumlah Pembayaran",
            formatter: function(value, data, index) {
                return numeral(value).format("0,000.00");
            },
            align: 'right'
        },
        // {
        //   field: "SalesReceiptDetails",
        //   title: "Lunas",
        //   formatter: function (value, data, index) {
        //     return data.IsPaidOff ? "Ya" : "Tidak";
        //   },
        // },
    ];

    rowFormatter(data, index) {
        if (data.isClosed) return { classes: "danger" };
        else return {};
    }

    loader = (info) => {
        var order = {};
        if (info.sort) order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        };

        return this.service.search(arg).then((result) => {
            var data = {};
            data.total = result.info.total;
            data.data = result.data;
            return data;
        });
    };

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute("view", { id: data.Id });
                break;
            case "Cetak Kuitansi":
                this.service.getSalesReceiptPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Kuitansi":
                return data;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute("create");
    }
}