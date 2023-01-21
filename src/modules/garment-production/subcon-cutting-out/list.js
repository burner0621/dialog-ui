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
        { field: "CutOutNo", title: "No Cutting Out" },
        { field: "UnitFromCode", title: "Unit Asal" },
        { field: "RONo", title: "RO" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalCuttingOutQuantity", title: "Jumlah Out", sortable: false },
        { field: "CuttingOutDate", title: "Tanggal Cutting Out", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "Items", title: "Kode Barang", sortable: false},
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
            result.data.forEach(s => {
                s.UnitFromCode=s.UnitFrom.Code;
                if(s.Items){
                    s.Items.toString = function () {
                        var str = "<ul>";
                        var products = [];
                        for (var item of s.Items) {
                            products.push(item.Product.Code)
                        }
                        var Products = products.filter(distinct);
                        for(var product of Products){
                        str += `<li>${product}</li>`;
                        }
                        str += "</ul>";
                        return str;
                            }
                    }
                    else{
                    s.Items = "-";
                    }         
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