import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail"]

    columns = [
        { field: "documentCreditNo", title: "Document Credit No" },
        { field: "amendNumber", title: "No Amend" },
        {
            field: "date", title: "Tgl Amend", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "description", title: "Description" },
        { field: "amount", title: "Amount" },
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
