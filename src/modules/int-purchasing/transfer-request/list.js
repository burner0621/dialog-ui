import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    context = ["Rincian", "Cetak PDF"];

    columns = [
        {
      field: "toBePosted", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.isPosted;
        return "";
      }
    },
        {
            field: "trDate", title: "Tanggal TR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "trNo", title: "Nomor TR" },
        { field: "divisionName", title: "Divisi"},
        { field: "unitName", title: "Unit"},
        { field: "categoryName", title: "Kategori"},
        { field: "isPosted", title: "Status Post", formatter: function (value, data, index) {
                 return value==1 ? "SUDAH" : "BELUM";
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
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                for(var a of result.data){
                    a.unitName=a.unit.name;
                    a.divisionName=a.unit.divisionName;
                    a.categoryName=a.category.name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;

        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak PDF":
        return data.isPosted;
      default:
        return true;
    }
  }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
    if (this.dataToBePosted.length > 0) {
        var Ids=[];
        for(var a of this.dataToBePosted){
            Ids.push(a.Id);
        }
      this.service.post(Ids).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
    }
  }

    rowFormatter(data, index) {
        if (data.isCanceled) return { classes: "danger" };
        if (data.isPosted) return { classes: "success" };
        return {  };
    }
}