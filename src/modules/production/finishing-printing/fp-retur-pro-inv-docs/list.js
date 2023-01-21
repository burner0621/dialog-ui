import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian", "Cetak PDF"];
    columns = [
        { field: "Code", title: "No. Bon Hasil Re-grading" },
        { field: "Bon.no", title: "No. Bon Terima Unit" },
        { field: "Bon.unitName", title: "Unit" },
        {
            field: "Date", title: "Tanggal", formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "TotalQuantity", title: "Total Jumlah (Piece)" },
        { field: "TotalLength", title: "Total Panjang (Meter)" },
        { field: "Supplier.name", title: "Supplier" },
        { field: "Status", title: "Status Retur" },
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
                var results = []
                for (var data of result.data) {
                    data.TotalQuantity = 0;
                    data.TotalLength = 0;

                    for (var i of data.Details) {
                        data.TotalQuantity += i.Quantity;
                        data.TotalLength += i.Length;
                    }

                    data.Status = data.Details.find(res => res.Retur == "Ya") ? "Ya" : "Tidak";
                    results.push(data);
                }

                // if (info.sort === "Total") { //custom sort
                //     if (info.order === "desc")
                //         results.sort(this.desc());
                //     else
                //         results.sort(this.asc());
                // }

                return {
                    total: result.info.total,
                    data: results,
                }
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextCallback(event) {
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

}

