import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Detail", "Cetak - By Carton"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
        { field: "invoiceType", title: "Jenis Invoice" },
        {
            field: "date", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SectionCode", title: "Seksi" },
        { field: "BuyerAgentName", title: "Buyer Agent" },
        {
            field: "truckingEstimationDate", title: "Tgl Trucking / Ex-fty", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "status", title: "Status", formatter: value => {
                if (value == "APPROVED_MD")
                    return "ON PROCESS";
                if (value == "REJECTED_SHIPPING_MD")
                    return "REJECTED SHIPPING";
                else
                    return value.replaceAll("_", " ");
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
            order: order,
            filter: JSON.stringify({ "(Status == \"APPROVED_MD\" || Status == \"APPROVED_SHIPPING\" || Status == \"REVISED_TO_MD\"|| Status == \"REJECTED_SHIPPING_MD\")": true })
        }

        return this.service.search(arg)
            .then(result => {
                for (const data of result.data) {
                    data.SectionCode = data.section.code;
                    data.BuyerAgentName = data.buyerAgent.name;
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

    rowFormatter(data, index) {
        switch (data.status) {
            case "APPROVED_SHIPPING":
                return { classes: "success" }
            case "REJECTED_SHIPPING_MD":
                return { classes: "danger" }
            case "REVISED_TO_MD":
                return { classes: "info"  }
            case "APPROVED_MD":
            default:
                return { css: { "background": "white" } }
        }
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak - By Carton":
                this.service.getPdfByFilterCarton(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
