import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [{
            field: "SendToVerificationDate",
            title: "Tanggal Masuk Verifikasi",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "VBRealizationNo", title: "No Realisasi VB" },
        {
            field: "VBRealizationDate",
            title: "Tanggal Realisasi VB",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "VBType",
            title: "Tipe VB",
            formatter: function(value, data, index) {
                return value == 1 ? "Dengan PO" : "Non PO"
            },
        },
        { field: "VBRequestName", title: "Pemohon VB" },
        { field: "UnitName", title: "Bagian/Unit" },
        { field: "CurrencyCode", title: "Mata Uang" },
        {
            field: "VBRealizationAmount",
            title: "Nominal",
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: "right"
        },
        {
            field: "Position",
            title: "Status",
            formatter: (value) => {
                switch (value) {
                    case 4:
                        return "Verifikasi Ke Kasir";
                    case 5:
                        return "Diterima Kasir";
                    case 6:
                        return "Ditolak";
                    default:
                        "-";
                }
            }
        },
        { field: "NotVerifiedReason", title: "Alasan" }
    ];

    tableOptions = {
        showColumns: true,
        search: true,
        showToggle: false,
        sortable: false,
        pagination: true,
        pageList:[10,25,50,100,250]
      };

    loader = (info) => {
        let order = {};

        // if (info.sort)
        //     order[info.sort] = info.order;
        // else
        //     order["Date"] = "desc";
        // console.log("loader parameter", info);
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.Count,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.VBRealizationId });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        this.router.navigateToRoute('post');
    }
}