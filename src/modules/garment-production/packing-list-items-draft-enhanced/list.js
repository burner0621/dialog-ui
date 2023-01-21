import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Detail"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
        {
            field: "createdUtc", title: "Tgl Packing List", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "buyerAgentName", title: "Buyer Agent" },
        { field: "destination", title: "Destination" },
        { field: "shippingStaffName", title: "Shipping Staff" },
        {
            field: "status", title: "Status", formatter: value => {
                if (value == "CREATED") {
                    return "ON PROCESS";
                } if (value == "REJECTED_SHIPPING_MD") {
                    return "APPROVED MD";
                } if (value == "REJECTED_SHIPPING_UNIT") {
                    return "REJECTED SHIPPING";
                } else {
                    return value.replaceAll("_", " ");
                }
            }
        },
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
                for (let data of result.data) {
                    data.buyerAgentName = (data.buyerAgent || {}).name;
                    data.shippingStaffName = (data.shippingStaff || {}).name;
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
