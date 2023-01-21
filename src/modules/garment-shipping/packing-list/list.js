import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Detail", "Cetak", "Cetak Kop", "Cetak Kop Sie D"]


    dataTobeDelivered = []

    columns = [
        {
            field: "isSampleDelivered", title: "Sudah Dikirim", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.isSampleDelivered;
                
                return '';
            }
        },
        { field: "invoiceNo", title: "No Invoice" },
        { field: "SectionCode", title: "Seksi" },
        { field: "BuyerAgentName", title: "Buyer Agent" },
        {
            field: "date", title: "Tgl Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
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

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ Status: "CREATED" })
        }

        return this.service.search(arg)
            .then(result => {
                console.log(result.data);
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

    constructor(router, service) {
        this.service = service;
        this.router = router;
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
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    rowFormatter(data, index) {
        if (data.isShipping) {
            return { classes: "success" }
        } else {
            return { classes: "danger" }
        }
    }

    delivered() {
        console.log(this.dataToBeDelivered);
        const DataToBeDelivered = this.dataToBeDelivered;
        if (DataToBeDelivered.length > 0) {
            if (confirm(`Deliver ${DataToBeDelivered.length} data?`)) {
                var ids = DataToBeDelivered.map(d => d.id);
                this.service.deliveredSample(ids)
                    .then(result => {
                        this.table.refresh();
                        this.dataToBeDelivered = [];
                    }).catch(e => {
                        this.error = e;
                    })
            }
        }
    }


}
