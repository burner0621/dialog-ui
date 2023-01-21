import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak PDF"];

    columns = [
        { field: "No", title: "No Bon Retur" },
        { field: "UnitName", title: "Unit" },
        {
            field: "_CreatedUtc", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "TotalQuantity", title: "Total Jumlah (Piece)" },
        { field: "TotalNecessaryLength", title: "Total Panjang (Meter)" },
        { field: "SupplierName", title: "Supplier" },
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;

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