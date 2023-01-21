import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
import numeral from "numeral";

@inject(Router, Service)
export class List {
    info = { page: 1, keyword: '' };

    context = ["Rincian", "Cetak PDF"]

    columns = [
        { field: "DispositionNo", title: "Nomor Disposisi Pembayaran" },
        {
            field: "CreatedUtc", title: "Tanggal Disposisi", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Category", title: "Kategori"},
        { field: "SupplierName", title: "Supplier" },
        {
            field: "DueDate", title: "Tanggal Jatuh Tempo", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "CurrencyName", title: "Mata Uang"},
        { field: "AmountDisposition", title: "Nominal Disposisi", sortable: false,formatter:function(value, data, index) {
            return numeral(value).format("0,000.00");
        }},
        
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

                return {
                    total: result.data.Total,
                    data: result.data.Data
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
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return true;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}