import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak Bukti Permohonan"];
    columns = [
        { field: "DocumentNo", title: "No. VB" },
        {
            field: "Date",
            title: "Tanggal",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            }
        },
        { field: "SuppliantUnitName", title: "Unit Pemohon" },
        { field: "CreatedBy", title: "Dibuat Oleh" },
        // {
        //   field: "IsPosted", title: "Status Post", formatter: function (value, data, index) {
        //     return value ? 'Sudah' : 'Belum';
        //   }
        // },
        {
            field: "ApprovalStatus",
            title: "Status Approved",
            formatter: function(value, row, index) {
                if (value == 2) return "Sudah";
                else if (value == 3) return "Cancel";
                else return "Belum";
            }
        },
        {
            field: "CancellationReason",
            title: "Alasan",
            formatter: function(value, row, index) {
                return value ? value : "-";
            }
        },
        {
            field: "IsCompleted",
            title: "Status Complete",
            formatter: function(value, data, index) {
                return value ? 'Sudah' : 'Belum';
            }
        }
    ];

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        else
            order["LastModifiedUtc"] = "desc";
        var filter = { Type: 2 }
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(filter)
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
        // return {
        //   total: 0,
        //   data: []
        // }
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
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak Bukti Permohonan":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Bukti Permohonan":
                return data;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        this.router.navigateToRoute('post');
    }
}