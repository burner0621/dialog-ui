import { inject } from 'aurelia-framework';
import { Service, SalesService } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service,AuthService, SalesService)
export class List {
    constructor(router, service, authService, salesService) {
        this.service = service;
        this.router = router;
        this.authService=authService;
        this.salesService = salesService;
    }

    filter={};
    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        // this.filter={
        //   CreatedBy: username
        // }
      }

    context = ["Rincian", "Cetak PDF"];

    columns = [
        { field: "SubconNo", title: "No Subcon Jasa Komponen" },
        { field: "SubconType", title: "Jenis Subcon" },
        { field: "UnitName", title: "Unit Asal" },
        { field: "Items", title: "RO"},
       // { field: "TotalQuantity", title: "Jumlah Out", sortable: false},
        { field: "SubconDate", title: "Tgl Subcon Jasa Komponen", formatter: value => moment(value).format("DD MMM YYYY") },
        //{ field: "Products", title: "Kode Barang", sortable: false, formatter: value => `${value.map(v => `&bullet; ${v}`).join("<br/>")}` },
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

        // return this.service.search(arg)
        return this.service.searchComplete(arg)
            .then(result => {
                var data = {};
                this.totalQuantity=result.info.totalQty;
                // result.data.forEach(d => {
                //     d.UnitName = d.Unit.name
                //     console.log(d.UnitName);
                // });
                data.data = result.data;
                result.data.map(s => {
                    // var arrQty = s.Items.map(d => {
                    //   return d.Details.reduce((acc, cur) => acc += cur.Quantity, 0);
                    // });
                    // s.TotalQty = arrQty.reduce((acc, cur) => acc += cur, 0);
                    s.UnitName = s.Unit.Name;
                    s.Items.toString = function () {
                      var str = "<ul>";
                      for (var item of s.Items){
                        str += `<li>${item.RONo}</li>`
                      }
                      str += "</ul>";
                      return str;
                    }
                });


                return {
                    total: result.info.total,
                    data: result.data,
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
    excel() {
        this.router.navigateToRoute('excel');
        // this.service.generateExcel();
    }
}