import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
@inject(Router, Service)
export class List {
    dataToBePosted = [];
    context = ["Rincian"];
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
              this.checkboxEnabled = !data.IsPosted;
              return ""
            }
        },
        { field: "No", title: "No Sales Contract" },
        { field: "Date", title: "Tgl. Sales Contract", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Type", title: "Jenis Sales Contract" },
        { field: "Buyer.Name", title: "Buyer"},
        { field: "ProcessType.Name", title: "Jenis Proses"},
        { field: "OrderQuantity", title: "Jumlah Order" }
    ];

    rowFormatter(data, index) {
        if (data.IsPosted)
          return { classes: "success" }
        else
          return {}
      }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
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

    contextCallback(event) {
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

    posting() {
        if (this.dataToBePosted.length > 0) {
          this.service.post(this.dataToBePosted.map(d => d.Id))
            .then(result => {
              this.table.refresh();
            }).catch(e => {
              this.error = e;
            })
        }
      }
}