import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        [
            { field: "VBNo", title: "No VB", rowspan: "2" },
            { field: "VBRealizationNo", title: "No Realisasi VB", rowspan: "2" },
            {
                field: "VBRealizationDate",
                title: "Tanggal Realisasi VB",
                formatter: function(value, data, index) {
                    return moment.utc(value).local().format('DD MMM YYYY');
                },
                rowspan: "2"
            },
            { field: "VBRequestName", title: "Nama", rowspan: "2" },
            { field: "UnitName", title: "Bagian/Unit", rowspan: "2" },
            { field: "DivisionName", title: "Divisi", rowspan: "2" },
            { title: "Nominal VB", colspan: "2" },
            { title: "Nominal Realisasi VB", colspan: "2" }
        ],
        [
            { field: "CurrencyCode", title: "Mata Uang" },
            {
                field: "VBAmount",
                title: "Nominal VB",
                formatter: function(value, data, index) {
                    return numeral(value).format('0,000.00');
                },
                align: "right"
            },
            { field: "CurrencyCode", title: "Mata Uang" },
            {
                field: "VBRealizationAmount",
                title: "Nominal Realisasi VB",
                formatter: function(value, data, index) {
                    return numeral(value).format('0,000.00');
                },
                align: "right"
            }
        ]
    ];

    loader = (info) => {
        let order = {};

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

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        this.router.navigateToRoute('post');
    }
}