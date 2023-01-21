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

    filter={};
    
    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter={
          CreatedBy: username
        }
      }

    context = ["Rincian"];

    columns = [
        { field: "SewingDONo", title: "No DO Sewing" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalQuantity", title: "Jumlah" },
        { field: "RONo", title: "RO" },
        { field: "UnitCode", title: "Unit"},
        {
            field: "SewingDODate", title: "Tgl Sewing DO", formatter: function (value, data, index) {
              return moment(value).format("DD MMM YYYY")
            },
        },
        
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
        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
          }
        return this.service.search(arg)
        .then(result => {
            this.totalQuantity=result.info.totalQty;
            var data = {};
            data.total = result.info.total;
            data.data = result.data;
            result.data.forEach(s => {
                s.UnitCode=s.Unit.Code;
                s.ProductList = `${s.Products.map(p => `- ${p}`).join("<br/>")}`;
                
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

    // create() {
    //     this.router.navigateToRoute('create');
    // }
}