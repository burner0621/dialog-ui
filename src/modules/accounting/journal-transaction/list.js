import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [{
            field: "Date",
            title: "Tanggal",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "DocumentNo", title: "No. Dokumen Jurnal" },
        { field: "Description", title: "Description" },
        { field: "ReferenceNo", title: "No. Referensi" },
        { field: "Status", title: "Status" }
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        else
            order["Date"] = "desc";

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        };

        if (this.info.dateFrom)
            arg.datefrom = moment(this.info.dateFrom).format("YYYY-MM-DD");

        if (this.info.dateTo)
            arg.dateto = moment(this.info.dateTo).format("YYYY-MM-DD");

        if (this.info.dateTo && this.info.dateFrom)
            return this.service.filter(arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                });
        else
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
        this.info = {};
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

    reset() {
        this.error = {};
        this.info.dateFrom = undefined;
        this.info.dateTo = undefined;
        this.tableList.refresh();
    }

    search() {
        this.error = {};
        this.tableList.refresh();
    }
}