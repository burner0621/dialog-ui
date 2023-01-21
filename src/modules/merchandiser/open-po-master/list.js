import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Rincian"]

    columns = [
        { field: "SCNo", title: "No Sales Contract" },
        { field: "PRNo", title: "No PR Master" },
        { field: "RONo", title: "No RO" },
        { field: "PRType", title: "Jenis PR Master" },
        {
            field: "Date", title: "Tgl PR Master", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerCode", title: "Kode Buyer" },
        { field: "BuyerName", title: "Nama Buyer" },
        { field: "Article", title: "Artikel" },
        {
            field: "ShipmentDate", title: "Tgl Shipment", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
    ];

    loader = (info) => {
        let order = {};
        if (info.sort) {
            order[info.sort] = info.order;
        }
        let filter = {};
        filter["Items.Any(IsOpenPO==true)"] = true;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(filter)
        }

        return this.service.search(arg)
            .then(result => {
                result.data.forEach(data => {
                    data.BuyerCode = data.Buyer.Code;
                    data.BuyerName = data.Buyer.Name;
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

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
