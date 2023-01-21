import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.isPosted)
      return { classes: "success" }
    else
      return {}
  }

  context = ["detail"]

  columns = [
    { field: "no", title: "No. Dokumen" },
    {
      field: "date", title: "Tanggal", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "referenceNo", title: "No. Referensi" },
    { field: "referenceType", title: "Jenis Referensi" },
    { field: "storageName", title: "Gudang" },
    { field: "type", title: "Status" }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    // console.log(info)
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["date", "code", "referenceNo", "referenceType", "type","storageName"],
      order: order
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

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "view":
        return true;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
