import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        {
            field: "LockDate", title: "Tanggal Transaksi Terkunci", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "Type", title: "Tipe" },
        { field: "Description", title: "Deskripsi" },
        {
            field: "IsActiveStatus", title: "Status",
            formatter: function (value, data, index) {
                return data.IsActiveStatus ? "Aktif" : "Tidak Aktif";
            }
        }
    ];

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
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

    // contextCallback(event) {
    //     let arg = event.detail;
    //     let data = arg.data;
    // }

    create() {
        this.router.navigateToRoute('create');
    }
}
