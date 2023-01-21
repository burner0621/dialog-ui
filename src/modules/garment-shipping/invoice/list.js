import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
import moment from 'moment';

@inject(Router, Service, AuthService)
export class List {

    context = ["detail","Cetak PDF Invoice", "Cetak PDF Invoice CMT", "Cetak PDF Invoice W/ Kop", "Cetak PDF Invoice CMT W/ Kop"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
       
        {
            field: "invoiceDate", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "from", title: "From" },
        { field: "to", title: "To"},
        { field: "buyerAgent.name", title: "Buyer Agent" },
        {
            field: "sailingDate", title: "Sailing", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
    ];
    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter = {
            CreatedBy: username
        }
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
            filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service,authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak PDF Invoice": 
                this.service.getPdfById(data.id, "fob"); 
                break;
            case "Cetak PDF Invoice CMT": 
                this.service.getPdfById(data.id, "cmt"); 
                break;
            case "Cetak PDF Invoice W/ Kop": 
                this.service.getPdfWHById(data.id, "fob"); 
                break;
            case "Cetak PDF Invoice CMT W/ Kop": 
                this.service.getPdfWHById(data.id, "cmt"); 
                break;                
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
