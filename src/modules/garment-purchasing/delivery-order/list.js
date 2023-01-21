import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        { field: "DONo", title: "Nomor Surat Jalan" },
        {
            field: "DODate", title: "Tanggal Surat Jalan", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierName", title: "Nama Supplier" },
        { field: "items", title: "List Nomor Eksternal PO", sortable: false }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select:["doNo", "doDate", "supplier.Name","items.purchaseOrderExternal.no"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.items.toString = function () {
                        var str = "<ul>";
                        for (var item of s.items) {
                            str += `<li>${item.purchaseOrderExternal.no}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
                // return data;
                for (var _data of result.data) {
                    _data.DONo = _data.doNo;
                    _data.DODate = _data.doDate;
                    _data.SupplierName = _data.supplier.Name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            })
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
