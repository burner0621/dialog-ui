import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Detail"];
    columns = [
        { field: "PreSCNo", title: "No Sales Contract" },
        { field: "RO_Number", title: "No RO" },
        { field: "Article", title: "Artikel" },
        { field: "UnitName", title: "Unit" },
        { field: "Quantity", title: "Kuantitas" },
        { field: "ConfirmPrice", title: "Harga Konfirmasi" },
        { field: "Section", title: "Seksi" },
        { field: "CreatedBy", title: "Staf Merchandiser" }
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
            filter: JSON.stringify({
                IsApprovedMD: true,
                IsApprovedPurchasing: false,
            })
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

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
}