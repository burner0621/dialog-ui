import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Rincian", "Cetak PDF"]

    columns = [
        
        { field: "UENNo", title: "No. Bon Pengeluaran Unit" },
        { field: "UnitDONo", title: "No. Delivery Order" },
        {
            field: "ExpenditureDate", title: "Tanggal Pengeluaran", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ExpenditureType", title: "Jenis Pengeluaran" },
        { field: "ExpenditureTo", title: "Tujuan Barang" },
        { field: "CreatedBy", title: "User" },
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
                var data = {};
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.toString = function () {
                        var str = "<ul>";
                        for (var item of s.Items) {
                            str += `<li>${item.RONo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
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
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.Id;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}