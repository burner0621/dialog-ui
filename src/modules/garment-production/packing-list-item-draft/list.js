import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Detail"]

    columns = [
        { field: "roNo", title: "No RO" },
        { field: "buyerBrandName", title: "Buyer Brand" },
        { field: "orderNo", title: "PO Buyer" },
        { field: "colourList", title: "Colour" },
        { field: "remarks", title: "Keterangan" },
        {
            field: "createdUtc", title: "Tgl Buat Draft RO", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        }
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
            .then(async result => {
                for (let data of result.data) {
                    data.buyerBrandName = (data.buyerBrand || {}).name;
                    if (data.details != null) {
                        data.colourList = `${data.details.map(p => `- ${p.colour}`).filter((value, index, self) => self.indexOf(value) === index).join("<br/>")}`;
                    }
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
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
