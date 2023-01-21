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
                field: "dateIm", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "code", title: "Nomor Pemeriksaan Kain" },
            { field: "shiftIm", title: "Shift" },
            { field: "operatorIm", title: "Operator" },
            { field: "machineNoIm", title: "No. Mesin" },
            { field: "inspectionMaterialBonNo", title: "No. Bon" },
            { field: "productionOrderNo", title: "No. Order" },
            { field: "productionOrderType", title: "Jenis Order" },
            { field: "cartNo", title: "No. Kereta" },
            {
                field: "isUsed", title: "Masuk Lot Warna",
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
                    total: result.total,
                    data: result.data
                }
            });
    }


    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.id);
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