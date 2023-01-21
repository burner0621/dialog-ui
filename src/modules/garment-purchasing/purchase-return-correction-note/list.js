import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.context = ["Rincian", "Cetak PDF", "Cetak PDF Return Note PPn", "Cetak PDF Return Note PPh"
    ];

        this.columns = [
            { field: "CorrectionNo", title: "Nomor Koreksi" },
            {
                field: "CorrectionDate", title: "Tanggal Koreksi",
                formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "SupplierName", title: "Nama Supplier" },
            { field: "DONo", title: "Nomor Surat Jalan" },
        ];
    }

    create() {
        this.router.navigateToRoute("create");
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian": this.router.navigateToRoute('view', { id: data.Id }); break;
            case "Cetak PDF": this.service.getPdfById(data.Id); break;
            case "Cetak PDF Return Note PPn": this.service.getPdfReturnNotePpn(data.Id); break;
            case "Cetak PDF Return Note PPh": this.service.getPdfReturnNotePph(data.Id); break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF Return Note PPn":
                return data.UseVat;
            case "Cetak PDF Return Note PPh":
                return data.UseIncomeTax;
            default:
                return true;
        }
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
         }

        return this.service.search(arg)
            .then(result => {
                for (const data of result.data) {
                    data.SupplierName = data.Supplier.Name;
                }
                
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }
}