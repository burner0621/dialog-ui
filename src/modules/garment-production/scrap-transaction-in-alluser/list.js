import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian"];
   
    columns = [
        { field: "TransactionNo", title: "No Bon" },
        { field: "TransactionDate", title: "Tanggal Masuk", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "ScrapSourceName", title: "Asal Barang" },
        { field: "ScrapDestinationName", title: "Gudang Tujuan" },
        { field: "CreatedBy", title: "Staff" }
    ]

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
               console.log(result);
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
      }
    
   
}