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
        // this.filter={
        //   CreatedBy: username
        // }
    }

    context = ["Rincian", "Cetak PDF"];

    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return "";
            }
        },
        { field: "RONoSample", title: "RO Sample" },
        { field: "SampleCategory", title: "Kategori Sample" },
        { field: "SampleRequestNo", title: "Nomor Surat Sample" },
        { field: "Date", title: "Tgl Surat Sample", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "BuyerName", title: "Buyer" },
        { field: "SentDate", title: "Tgl Kirim", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "POBuyer", title: "PO Buyer" },
        { field: "Status", title: "Status" },
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
            filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
            .then(result => {
                result.data.forEach(s => {
                    s.BuyerName=s.Buyer.Name;
                    s.Status="CREATED";
                    if(s.IsPosted && !s.IsReceived && !s.IsRejected && !s.IsRevised){
                        s.Status="POSTED";
                    }
                    else if(s.IsReceived && !s.IsRevised){
                        s.Status="APPROVED";
                    }
                    else if(s.IsRejected){
                        s.Status="REJECTED";
                    }
                    else if(s.IsRevised){
                        s.Status="REVISED";
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

    posting() {
        const unpostedDataToBePosted = this.dataToBePosted.filter(d => d.IsPosted === false);
        if (unpostedDataToBePosted.length > 0) {
            if (confirm(`Post ${unpostedDataToBePosted.length} data?`)) {
                var ids = unpostedDataToBePosted.map(d => d.Id);
                var dataToBePosteds = {
                    Identities: ids,
                    id: ids,
                    Posted: true
                }
                this.service.postSample(dataToBePosteds)
                    .then(result => {
                        this.table.refresh();
                        this.dataToBePosted = [];
                    }).catch(e => {
                        this.error = e;
                    })
            }
        }
    }

    rowFormatter(data, index) {
        if (data.Status=="APPROVED")
            return { classes: "success" }
        else if (data.Status=="REVISED")
            return { classes: "info" }
        else if (data.Status=="REJECTED")
            return { classes: "danger" }
        else
            return {}
    }
}