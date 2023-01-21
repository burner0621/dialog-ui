import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail","Cetak PDF"]

    columns = [
        { field: "exportSalesDONo", title: "No DO Penjualan" },
        {
            field: "date", title: "Tgl DO", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "invoiceNo", title: "Invoice No" },
        { field: "buyerAgentName", title: "Buyer Agent" },
        { field: "to", title: "Kepada" },
        { field: "UnitName", title: "Bag Gudang" },
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
                    data.buyerAgentName = `${data.buyerAgent.name}`;
                    data.UnitName=data.unit.name;
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
