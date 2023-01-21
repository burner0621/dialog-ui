import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class List {

     context = ["Detail", "Cetak", "Cetak Kop", "Cetak Kop Sie D", "Cetak-Excel"]

    columns = [
        { field: "invoiceNo", title: "No Invoice" },
        { field: "invoiceType", title: "Jenis Invoice" },
        {
            field: "date", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SectionCode", title: "Seksi" },
        { field: "BuyerAgentName", title: "Buyer Agent" },
        {
            field: "truckingDate", title: "Tgl Trucking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "exportEstimationDate", title: "Tgl Perkiraan Export", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "destination", title: "Destination" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter : JSON.stringify({ "(Status == \"APPROVED_SHIPPING\" || Status == \"DELIVERED\")": true, ShippingStaffName: username })
        }

        return this.service.search(arg)
            .then(result => {
                for (const data of result.data) {
                    data.SectionCode = data.section.code;
                    data.BuyerAgentName=data.buyerAgent.name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService=authService;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "Cetak":
                this.service.getPdfById(data.id);
                break;
            case "Cetak Kop":
                this.service.getPdfWHById(data.id);
                break;                
            case "Cetak Kop Sie D":
                this.service.getPdfWHSectionDById(data.id);
                break;                
            case "Cetak-Excel":
                this.service.getExcelById(data.id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
