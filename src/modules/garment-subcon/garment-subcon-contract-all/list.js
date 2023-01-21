import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service,AuthService)
export class List {

    constructor(router, service,authService) {
        this.service = service;
        this.router = router;
        this.authService=authService;
    }

    rowFormatter(data, index) {
        if (data.BPJNo && data.SKEPNo){
            return { classes: "success" }
        }
        else
        {
            return { classes: "danger" }
        }
    }

    filter={};

    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
      }

    context = ["Rincian", "Cetak Excel"];
    
    columns = [
        { field: "ContractNo", title: "No/Tgl Kontrak" },
        { field: "ContractType", title: "Jenis Kontrak" },
        { field: "AgreementDate", title: "Tgl Persetujuan", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY")
            },
        },
        { field: "SupplierName", title: "Penerima" },
        // { field: "BuyerName", title: "Buyer" },
        { field: "Quantity", title: "Quantity" },
        { field: "UomUnit", title: "Satuan" },
        { field: "JobType", title: "Jenis Pekerjaan", sortable: false },
        //{ field: "BPJNo", title: "No/Tgl BPJ"},
        { field: "FinishedGoodType", title: "Jenis Barang Jadi"},
        {
            field: "DueDate", title: "Tgl Jatuh Tempo", formatter: function (value, data, index) {
              return moment(value).format("DD MMM YYYY")
            },
        },
        { field: "CreatedBy", title: "Staff Pembelian" }
    ]

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter:JSON.stringify(this.filter)
        }
        return this.service.search(arg)
        .then(result => {
            this.totalQuantity=result.info.totalQty;
            var data = {};
            data.total = result.info.total;
            data.data = result.data;
            result.data.forEach(s => {
                s.SupplierCode=s.Supplier.Code;
                s.SupplierName=s.Supplier.Name;
                // s.BuyerName=s.Buyer.Name;
                s.UomUnit=s.Uom.Unit;
            });
            return {
            total: result.info.total,
            data: result.data
            }
        });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak Excel":
                this.service.getExcelById(data.Id);
                break;
        }
    }

    // create() {
    //     this.router.navigateToRoute('create');
    // }
}