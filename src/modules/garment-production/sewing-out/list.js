import { inject } from 'aurelia-framework';
import { Service,PurchasingService } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service,AuthService,PurchasingService)
export class List {
    constructor(router, service,authService,purchasingService) {
        this.service = service;
        this.router = router;
        this.authService=authService;
        this.purchasingService=purchasingService;
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

    context = ["Rincian","Cetak PDF"];
    
    columns = [
        { field: "SewingOutNo", title: "No Sewing Out" },
        {
            field: "SewingOutDate", title: "Tgl Sewing Out", formatter: function (value, data, index) {
              return moment(value).format("DD MMM YYYY")
            },
        },
        { field: "RONo", title: "RO" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalQuantity", title: "Jumlah", sortable: false },
        { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
        { field: "UnitCode", title: "Unit Sewing Out"},
        { field: "SewingTo", title: "Proses Tujuan"},
        { field: "UnitToCode", title: "Unit Tujuan"},
        { field: "ColorList", title: "Warna", sortable: false },
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
            var data = {};
            data.total = result.info.total;
            data.data = result.data;
            result.data.forEach(s => {
                s.UnitCode=s.Unit.Code;
                s.UnitToCode=s.UnitTo.Code;
                s.ColorList = `${s.Colors.map(p => `- ${p}`).join("<br/>")}`;
                s.ProductList = `${s.Products.map(p => `- ${p}`).join("<br/>")}`;
                
            });
            return {
            total: result.info.total,
            data: result.data
            }
        });
    }

    async contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        let pr = await this.purchasingService.getGarmentPR({ size: 1, filter: JSON.stringify({ RONo: data.RONo }) });
        var buyer="";
        if(pr.data.length>0){
            buyer = pr.data[0].Buyer.Code;
        }
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF": 
                this.service.getPdfById(data.Id,buyer); 
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}