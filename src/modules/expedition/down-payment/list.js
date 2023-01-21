import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    dataToBePosted = [];

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }

    context = ["Detail", "Cetak Bukti Pembayaran"]

    columns = [
        { field: "DocumentNo", title: "No. Bukti Pembayaran" },
        { field: "BuyerName", title: "Buyer" },
        { field: "CategoryAcceptance", title: "Kategori Pembayaran" },
        {
            field: "DatePayment",
            title: "Tanggal Pembayaran",
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "CurrencyCode", title: "Kurs" },
        {
            field: "TotalPayment",
            title: "Jumlah Pembayaran",
            formatter: function(value, data, index) {
                return value ? numeral(value).format('0,000.00') : '0';
            },
            align: 'right'
        }
    ];

    async activate(params) {
        this.ressearch = params.search;
    }

    loader = (info) => {
        var order = {};
        // console.log(info);
        //
        //

        if (this.ressearch == null) {

            this.ressearch = info.search;
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
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                });

        } else if (info.search == null) {

            info.search = this.ressearch;
            if (info.sort)
                order[info.sort] = info.order;
            var arg = {
                page: parseInt(info.offset / info.limit, 10) + 1,
                size: info.limit,
                keyword: this.ressearch,
                order: order
            }

            return this.service.search(arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                });
        } else {

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
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                });
        }




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
                this.router.navigateToRoute('view', { id: data.Id, search: this.ressearch });
                break;
            case "Cetak Bukti Pembayaran":
                this.service.getSalesReceiptPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Bukti Pembayaran":
                return data;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}