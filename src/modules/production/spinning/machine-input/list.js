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

    context = ["detail"];
    columns = [
        // { field: "NomorInputProduksi", title: "Nomor Input Produksi" },
        // { field: "Yarn.Name", title: "Yarn Name" },
        { field: "ProcessType", title: "Jenis Proses" },
        { field: "YarnMaterialType.Name", title: "Kode Benang" },
        { field: "LotConfiguration.LotNo", title: "No Lot" },
        { field: "UnitDepartment.Name", title: "Unit Name" },
        { field: "Shift", title: "Shift" },
        {
            field: "Date", title: "Date", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        }
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
                return {
                    total: result.info.count,
                    data: result.data
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

}

