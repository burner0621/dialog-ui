import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service,AuthService)
export class List {
    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService=authService;
    }

    filter={};
    
    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter={
          CreatedBy: username,
         // "FinishingInType!='PEMBELIAN'":true,

        }
        this.filter[`FinishingInType != "PEMBELIAN"`]=true;
      }

    context = ["Rincian"];
   
    columns = [
        { field: "FinishingInNo", title: "No Finishing In" },
        { field: "RONo", title: "RO" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalFinishingInQuantity", title: "Jumlah", sortable: false },
        { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
        { field: "UnitCode", title: "Unit Finishing In" },
        { field: "FinishingInType", title: "Asal Barang" },
        { field: "UnitFromCode", title: "Unit Asal" },
        { field: "FinishingInDate", title: "Tanggal Finishing In", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "ProductList", title: "Kode Barang", sortable: false },
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
                result.data.forEach(d => {
                    d.UnitCode=d.Unit.Code;
                    d.UnitFromCode=d.UnitFrom.Code;
                    d.ProductList = `${d.Products.map(p => `- ${p}`).join("<br/>")}`;
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
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}