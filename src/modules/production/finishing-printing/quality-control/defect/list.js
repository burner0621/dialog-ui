import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.IsUsed)
            return { classes: "success" }
        else
            return {}
    }

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
        this.context = ["Rincian", "Cetak PDF"];
    }

    setColumns() {
        this.columns = [
            {
                field: "DateIm", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "Code", title: "Nomor Pemeriksaan Kain" },
            { field: "ShiftIm", title: "Shift" },
            { field: "OperatorIm", title: "Operator" },
            { field: "MachineNoIm", title: "No. Mesin" },
            { field: "ProductionOrderNo", title: "No. Order" },
            { field: "ProductionOrderType", title: "Jenis Order" },
            { field: "CartNo", title: "No. Kereta" },
            {
                field: "IsUsed", title: "Masuk Lot Warna",
                formatter: function (value, row, index) {
                    return value ? "SUDAH" : "BELUM";
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
            // select: ["dateIm", "code", "shiftIm", "operatorIm", "machineNoIm", "productionOrderNo", "productionOrderType", "cartNo", "isUsed"]
            // packing: 
        }
        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    asc() {
        return function (kanban1, kanban2) {
            if (kanban1.isComplete && !kanban2.isComplete)
                return -1;
            if (!kanban1.isComplete && kanban2.isPending())
                return -1;
            if (!kanban1.isComplete && kanban2.isComplete)
                return 1;
            if (kanban1.isPending() && !kanban2.isComplete)
                return 1;

            return 0;
        }
    }

    desc() {
        return function (kanban1, kanban2) {
            if (kanban1.isComplete && !kanban2.isComplete)
                return 1;
            if (!kanban1.isComplete && kanban2.isPending())
                return 1;
            if (!kanban1.isComplete && kanban2.isComplete)
                return -1;
            if (kanban1.isPending() && !kanban2.isComplete)
                return -1;

            return 0;
        }
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

    contextShowCallback(index, name, data) {
        return true;
    }

    create() {
        this.router.navigateToRoute('create');
    }
}