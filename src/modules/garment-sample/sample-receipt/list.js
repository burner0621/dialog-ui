import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService)
export class List {
    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    filter = {};
    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter = {
            IsPosted: true,
            IsRejected: false,
            IsRevised: false
        }
    }

    context = ["Rincian", "Cetak PDF"];

    columns = [
        { field: "RONoSample", title: "RO Sample" },
        { field: "SampleCategory", title: "Jenis Sample" },
        { field: "SampleRequestNo", title: "Nomor Surat Sample" },
        { field: "Date", title: "Tgl Surat Sample", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "BuyerName", title: "Buyer" },
        { field: "SentDate", title: "Tgl Kirim", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "POBuyer", title: "PO Buyer" },
        { field: "Status", title: "Status" },
    ]

    loader = (info) => {
        var order = { "IsReceived": "asc", "Date": "desc" };
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
                result.data.map(s => {
                    s.BuyerName = s.Buyer.Name;
                    s.Status = s.IsReceived ? "SUDAH TERIMA" : "BELUM DI TERIMA";
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

    rowFormatter(data, index) {
        if (data.IsReceived)
            return { classes: "success" }
        else
            return {}
    }
}