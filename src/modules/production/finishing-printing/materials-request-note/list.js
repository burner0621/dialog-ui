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

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian", "Cetak PDF"];
    }

    setColumns() {
        this.columns = [
            { field: "Code", title: "No. SPB" },
            { field: "Unit.Name", title: "Unit" },
            { field: "RequestType", title: "Tipe" },
            { field: "ProductionOrderList", title: "No. SPP" },
            {
                field: "IsCompleted", title: "Status", formatter: function (value, data, index) {
                    return data.RequestType.toUpperCase() == "AWAL" ? (value ? "SUDAH COMPLETE" : "BELUM COMPLETE") : "-";
                }
            }
        ];
    }


    loadData = (info) => {
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
            .then((result) => {
                for (var data of result.data) {
                    data.ProductionOrderList = data.MaterialsRequestNote_Items.map((item) => {
                        if (item && item.ProductionOrder.OrderNo)
                            return "- " + item.ProductionOrder.OrderNo;
                    });
                    data.ProductionOrderList = data.ProductionOrderList.join("\n");
                }

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
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
