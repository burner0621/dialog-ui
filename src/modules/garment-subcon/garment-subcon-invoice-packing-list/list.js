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

    // rowFormatter(data, index) {
    //     if (data.BPJNo && data.SKEPNo){
    //         return { classes: "success" }
    //     }
    //     else
    //     {
    //         return { classes: "danger" }
    //     }
    // }

    filter={};

    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
      
      }

    context = ["Rincian", "Cetak PDF"];
    
    columns = [
        { field: "InvoiceNo", title: "No Invoice" },
        { field: "Date", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY")
            },
        },
        { field: "BCType", title: "Tipe BC" },
        { field: "SupplierName", title: "Nama Supplier" },
        { field: "SupplierAddress", title: "Alamat Supplier" },
        
        { field: "ContractNo", title: "No Subcon Contract" },
        { field: "DLNos", title: "Nomor Surat Jalan Subcon", sortable: false, formatter: value => `${value.map(v => `&bullet; ${v}`).join("<br/>")}` },
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
                s.SupplierAddress=s.Supplier.Address;

                s.DLNoList = `${s.DLNos.map(p => `- ${p}`).join("<br/>")}`
                // s.BuyerName=s.Buyer.Name;
                // s.UomUnit=s.Uom.Unit;
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
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}