import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    dataToBePosted = [];

    // context = ["Detail", "Cetak", "Cetak-Excel"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },        
        {
            field: "createdUtc", title: "Tgl Packing List", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "truckigDate", title: "Tgl Trucking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "section.code", title: "Seksi" },        
        { field: "buyerAgent.code", title: "Kode Buyer" },
        { field: "buyerAgentName", title: "Nama Buyer" },
        { field: "destination", title: "Destination" },
        { field: "shippingStaffName", title: "Shipping Staff" },
        { field: "status", title: "Status" },       
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ "(Status != \"CREATED\")": true })
        }

        return this.service.search(arg)
            .then(result => {
              for (const data of result.data) {
                    data.buyerAgentName = (data.buyerAgent || {}).name;
                    data.shippingStaffName = (data.shippingStaff || {}).name;
                }
             
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    rowFormatter(data, index) {
        switch (data.status) {
            case "CANCELED":
                return { css: { "background": "#eeeeee" } }
            case "APPROVED_MD":
            case "REJECTED_SHIPPING_MD":
                return { classes: "warning" }
            case "APPROVED_SHIPPING":
                return { classes: "success" }
            case "REJECTED_MD":
            case "REJECTED_SHIPPING_UNIT":
                return { classes: "danger" }
            case "REVISED_MD":
            case "REVISED_SHIPPING":
                return { classes: "info" }
            case "POSTED":
            default:
                return { css: { "background": "white" } }
        }
    }

    // contextClickCallback(event) {
    //     var arg = event.detail;
    //     var data = arg.data;
    //     switch (arg.name) {
    //         case "Detail":
    //             this.router.navigateToRoute('view', { id: data.id });
    //             break;
    //         case "Cetak":
    //             this.service.getPdfById(data.id);
    //             break;
    //         case "Cetak-Excel":
    //             this.service.getExcelById(data.id);
    //             break;
    //     }
    // }

    // create() {
    //     this.router.navigateToRoute('create');
    // }

    // posting() {
    //     if (this.dataToBePosted.length > 0) {
    //         this.service.post(this.dataToBePosted.map(d => d.id))
    //             .then(result => {
    //                 this.table.refresh();
    //             }).catch(e => {
    //                 this.error = e;
    //             })
    //     }
    // }
}
