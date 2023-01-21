import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail","Cetak PDF"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
        {
            field: "date", title: "Tgl Shipping Instruction", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ForwarderName", title: "Forwarder" },
        { field: "attn", title: "ATTN" },
        { field: "shippedBy", title: "Shipped By" },
        {
            field: "truckingDate", title: "Tgl Trucking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerAgentName", title: "Consignee" },
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
                for (const data of result.data) {
                    data.ForwarderName = data.forwarder.name;
                    //data.attn = data.forwarder.attn;
                    data.BuyerAgentName=data.buyerAgent.name;
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak PDF": 
                this.service.getPdfById(data.id); 
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
