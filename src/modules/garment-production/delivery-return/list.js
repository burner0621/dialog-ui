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
        { field: "DRNo", title: "No Retur Proses" },
        { field: "UnitDONo", title: "No Unit DO" },
        {
            field: "ReturnDate", title: "Tgl Retur", formatter: function (value, data, index) {
              return moment(value).format("DD MMM YYYY")
            },
        },
        { field: "Unit.Name", title: "Unit"},
        { field: "Storage.Name", title: "Gudang" },
    ]

    filter={};

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
                return {
                    total: result.info.count,
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