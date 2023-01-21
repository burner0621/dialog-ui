import { inject, bindable } from 'aurelia-framework';
import { Service, CoreService } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service, CoreService)
export class List {
    @bindable section;

    context = ["Detail"]

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
        { field: "destination", title: "Destination" },
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
            filter: JSON.stringify({ Status: "POSTED", SectionCode: this.section })
        }

        return this.service.search(arg)
            .then(result => {
                for (const data of result.data) {
                    data.SectionCode = data.section.code;
                    data.BuyerAgentName = data.buyerAgent.name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service, coreService) {
        this.service = service;
        this.router = router;
        this.coreService = coreService;
    }

    async activate() {
        let sectionResult = await this.coreService.getSections();
        this.SectionOptions = sectionResult.data.map(d => d.Code);
        this.SectionOptions.unshift("Pilih Seksi");
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }

    sectionChanged() {
        if (this.table) {
            this.table.refresh();
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
