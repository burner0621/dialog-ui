import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    approve = [];

    columns = [
        {
            title: "Approve Checkbox", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = data.IsApproved ? false : true;
            }
        },
        { field: "No", title: "No Bon Pengantar" },
        {
            field: "_CreatedUtc", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Type", title: "Tipe Bon" },
        {
            field: "IsApproved", title: "Status Approve", formatter: function (value, data, index) {
                return data.IsDisposition ? (value ? "SUDAH" : "BELUM") : "-";
            }
        }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ IsDisposition: true })
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    approveData() {
        if (this.approve.length > 0) {
            let updateData = this.approve.map(d => {
                return d.Id;
            });

            this.service.approveData(updateData)
                .then(response => {
                    this.table.refresh();
                    this.approve = [];
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    rowFormatter(data, index) {
        if (data.IsApproved)
            return { classes: "success" };
        else
            return {};
    }
}