import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

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
        { field: "Division.name", title: "Divisi"},
        { field: "Category.name", title: "Kategori"},
        { field: "Supplier.name", title: "Supplier" },
        { field: "Currency.code", title: "Mata Uang"},
        {
            field: "PaymentDueDate", title: "Tanggal Jatuh Tempo", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "externalPurchaseOrderNo", title: "Nomor External Purchase Order", sortable: false },
        
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
                for (var _data of result.data) {
                    
                    var EPONo = _data.Items.map(function (item) {
                        return `<li>${item.EPONo}</li>`;
                    });
                    var uniqueArray = EPONo.filter(function(item, pos) {
                        return EPONo.indexOf(item) == pos;
                    })
                    _data.externalPurchaseOrderNo = `<ul>${uniqueArray.join()}</ul>`;
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