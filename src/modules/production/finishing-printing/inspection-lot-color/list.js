import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian"];
    }

    setColumns() {
        this.columns = [
            {
                field: "date", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "productionOrderNo", title: "No. Order" },            
            { field: "cartNo", title: "No. Kereta" },
            { field: "fabricQualityControlCode", title: "Nomor Pemeriksaan Kain" },
            { field: "productionOrderType", title: "Jenis Order" },
            { field: "color", title: "Warna" }
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
            order: order,
            select: ["date", "productionOrderNo", "cartNo", "fabricQualityControlCode", "productionOrderType", "color"]
        }

        return this.service.search(arg)
            .then((result) => {
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
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    create() {
        this.router.navigateToRoute('create');
    }
}