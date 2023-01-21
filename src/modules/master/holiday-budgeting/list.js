import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    {
        field: "date", title: "Tanggal Libur",
        formatter: (value, data) => {
        return moment(value).format("DD MMM YYYY");
       }
    },
    { field: "name", title: "Nama Hari Libur" },
    { field: "division.name", title: "Divisi" },
    { field: "description", title: "Keterangan" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
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
        this.accessoriesId = "";
        this.accessories = [];
    }

    contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }
    
    create() {
        this.router.navigateToRoute('create');
    }

}
