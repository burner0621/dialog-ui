import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Detail"];
    // context = ["Detail"];
    dataToBePosted = [];
    columns = [
        { field: "PreSalesContract.No", title: "Nomor Sales Contract" },
        { field: "ProductionOrderNo", title: "Nomor SPP" },
        { field: "PreSalesContract.Unit.Name", title: "Unit" },
        { field: "PreSalesContract.OrderQuantity", title: "Kuantitas" },
        { field: "ConfirmPrice", title: "Harga Konfirmasi" }
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
                IsPosted : true,
                IsApprovedMD : false
            })
        }
        // return { total: 0, data: {} };
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

    rowFormatter(data, index) {
        // if (data.ApprovalMD && data.ApprovalPPIC && data.ApprovalMD.IsApproved && data.ApprovalPPIC.IsApproved)
        if (data.IsPosted)
            return { classes: "success" }
        else
            return { classes: "danger" }
    }

    get postButtonActive() {
        return this.dataToBePosted.filter(d => d.IsPosted === false).length < 1;
    }
    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak Cost Calculation":
                this.service.getPdfById(data.Id)
                break;
            case "Cetak Budget":
                this.service.getBudgetById(data.Id)
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Cost Calculation":
            case "Cetak Budget":
                return data.IsPosted;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        const unpostedDataToBePosted = this.dataToBePosted.filter(d => d.IsPosted === false);
        if (unpostedDataToBePosted.length > 0) {
            if (confirm(`Post ${unpostedDataToBePosted.length} data?`)) {
                this.service.postCC(unpostedDataToBePosted.map(d => d.Id))
                    .then(result => {
                        this.table.refresh();
                        this.dataToBePosted = [];
                    }).catch(e => {
                        this.error = e;
                    })
            }
        }
    }
}