import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail","cetak PDF"]

    columns = [
        { field: "ExpenditureNo", title: "No Bon Pengeluaran" },
        {
            field: "ExpenditureDate", title: "Tgl Pengeluaran Gudang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ExpenditureDestination", title: "Tujuan Pengeluaran " },
        { field: "UnitExpenditureName", title: "Unit Tujuan" },
        { field: "BuyerName", title: "Buyer" },
        { field: "EtcRemark", title: "Keterangan Lain-lain" },
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
                    data.UnitExpenditureName = data.UnitExpenditure.Name;
                    data.BuyerName = data.Buyer.Name;
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
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
