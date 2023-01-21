import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "unit.name", title: "Unit",
            formatter: (value, data) => {
                return data.unitDivision;
            } 
        },
        { field: "URNNo", title: "No. Bon Unit" ,
            formatter: (value, data) => {
                return data.no;
            } },
        {
            field: "receiptDate", title: "Tanggal Bon Unit",
            formatter: (value, data) => {
                return moment(data.date).format("DD MMM YYYY");
            }
        },
        { field: "supplier.name", title: "Supplier" },
        { field: "doNo", title: "No. Surat Jalan" },
        { field: "Items.PRNo", title: "No. Purchase Request" , sortable: false ,
            formatter: (value, data) => {
                return data.purchaseRequestNo;
            } }
    ];

    context = ["Rincian", "Cetak PDF"];

    today = new Date();

    isPrint = false;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {

    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                result.data.map((data) => {
                    data.unitDivision = data.unit.division.name + " - " + data.unit.name;
                    return data;
                });
                for (var _data of result.data) {
                    _data.Id= _data._id?_data._id:_data.Id;
                    var prNo = _data.items.map(function (item) {
                        return `<li>${item.prNo}</li>`;
                    });
                    var uniqueArray = prNo.filter(function(item, pos) {
                        return prNo.indexOf(item) == pos;
                    })
                    _data.purchaseRequestNo = `<ul>${uniqueArray.join()}</ul>`;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    back() {
        this.router.navigateToRoute('list');
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }
}