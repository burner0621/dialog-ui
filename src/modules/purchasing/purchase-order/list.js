import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }
    context = ["Rincian"]

    columns = [
        { field: "poNo" , title: "No. PO Internal"},
        { field: "DivisionName", title: "Divisi" },
        { field: "unit.name", title: "Unit" },
        { field: "category.name", title: "Kategori" },
        { field: "prNo", title: "No. PR" },
        {
            field: "prDate", title: "Tgl. PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "expectedDeliveryDate", title: "Tgl. Diminta Datang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "CreatedBy", title: "Staff Pembelian" },
        {
            field: "isPosted", title: "Posted",
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
        for (var data of result.data) {
            data.DivisionName = data.unit.division.name;
            data.UnitName = data.unit.name;
            data.CategoryName = data.category.name;
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
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}