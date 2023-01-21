import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    // context = ["detail"]

    columns = [
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "noBon", title: "No Bon" },
        { field: "noSpp", title: "No. SPP" },
        { field: "buyer", title: "Buyer" },
        { field: "shift", title: "Shift" },
        { field: "material", title: "Material" },
        { field: "unit", title: "Unit" },        
        { field: "warna", title: "Warna" },
        { field: "motif", title: "Motif" },
        { field: "grade", title: "Grade" },
        { field: "mtr", title: "Mtr" },
        { field: "yds", title: "Yds" },
        { field: "saldo", title: "Saldo" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        // return this.service.search(arg)
        return this.service.getListDummy(arg)
            .then(result => {
                var data = {}
                data.total = result.length;
                data.data = result;
                return data;
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
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }


    create() {
        this.router.navigateToRoute('create');
    }
}

