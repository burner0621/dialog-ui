import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.IsCanceled) return { classes: "danger" };
        if (data.IsPost) return { classes: "success" };
        return {  };
    }
    context = ["Rincian"]

    columns = [
        { field: "DivisionName", title: "Divisi" },
        { field: "UnitName", title: "Unit" },
        { field: "CategoryName", title: "Kategori" },
        { field: "TRNo", title: "No. TR" },
        {
            field: "TRDate", title: "Tgl. PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "RequestedArrivalDate", title: "Tgl. Diminta Datang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "_CreatedBy", title: "Staff Pembelian" },
        {
            field: "IsPost", title: "Posted",
            formatter: function (value, row, index) {
                return value ? "SUDAH" : "BELUM";
            }
        }
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
        }
        // console.log(data);
    }

    create() {
        this.router.navigateToRoute('create');
    }
}