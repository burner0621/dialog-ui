import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    context = []

    columns = [
        { field: "FinishingPrintingSalesContract.CostCalculation.PreSalesContract.No", title: "No. Sales Contract" },
        { field: "FinishingPrintingSalesContract.CostCalculation.ProductionOrderNo", title: "No. SPP" },
        { field: "FinishingPrintingSalesContract.CostCalculation.PreSalesContract.Buyer.Name", title: "Buyer" },
        { field: "FinishingPrintingSalesContract.CostCalculation.PreSalesContract.Unit.Name", title: "Unit" },
        { field: "FinishingPrintingSalesContract.CostCalculation.PreSalesContract.ProcessType.Name", title: "Jenis Proses" },
        {
            field: "DeliveryDate", title: "Tanggal Delivery", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "IsApprovedMD", title: "Validasi Md",
            formatter: function (value, data, index) {
                return data.ApprovalMD.IsApproved ? "Sudah" : "Belum";
            }
        },
        {
            field: "IsApprovedSample", title: "Validasi Sample",
            formatter: function (value, data, index) {
                return data.ApprovalSample.IsApproved ? "Sudah" : "Belum";
            }
        },
        {
            field: "IsClosed", title: "Status",
            formatter: function (value, data, index) {
                return data.isClosed ? "Closed" : "Open";
            }
        }
    ];

    rowFormatter(data, index) {
        if (data.ApprovalMD.IsApproved && data.ApprovalSample.IsApproved)
            return { classes: "success" };
        else
            return { classes: "danger" }
    }



    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            // select: ["orderNo", "salesContractNo", "buyer", "deliveryDate", "processType", "isClosed"]
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
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
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "print":
                this.service.getPdfById(data.Id);
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

    close() {
        if (this.dataToBeClosed.length > 0) {
            this.service.close(this.dataToBeClosed).then(result => {
                this.table.refresh();
            }).catch(e => {
                this.error = e;
            })
        }
    }
}

